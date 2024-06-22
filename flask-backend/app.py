import os
from flask import Flask, request, redirect, url_for, render_template,jsonify
import requests
from io import BytesIO
import sys
from gradio_client import Client, handle_file
from werkzeug.utils import secure_filename
import numpy as np
from flask_cors import CORS


project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)

from model_factory.review_classifier import Review_Classifier


app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}}, 
            allow_headers=['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'X-CSRF-Token', 'X-My-Custom-Header', 'X-Another-Custom-Header'],
            methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'])


client1 = Client("theArijitDas/Product-Update-Validator")
client2= Client("piyushjain4/fake_logo_detection")

# Initialize the classifiers
review_classifier = Review_Classifier(model_name='distilbert', return_bool=True)
 
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/predict-logo', methods=['POST'])
def predictLogo():
    if request.method == 'POST':
        # Get user inputs from the form
        file = request.files['input_image']
        
        # Validate and save image1
     
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
    
        # Now you can pass the inputs to the Gradio client2 predict function
        result = client2.predict(
            input_image=handle_file(filepath),
            api_name="/predict"
        )
        
        # Return the result as JSON
        return jsonify(result)

@app.route('/predict-review', methods=['POST'])
def predict_review():
    data = request.get_json()
    review_text = data['review']
    prediction = review_classifier.hybrid_classify(review_text)  # Use hybrid_classify or other method as needed
    return jsonify({'prediction': prediction})

@app.route('/rate-product', methods=['POST'])
def rate_product():
    data = request.get_json()
    reviews = data['reviews']
    product_reviews_info = review_classifier.rate_product(reviews, return_frac=False)  # Use hybrid_classify or other method as needed
    serializable_product_reviews_info = {key: int(value) if isinstance(value, (np.integer, np.int32, np.int64)) else value 
                                         for key, value in product_reviews_info.items()}
    return jsonify(serializable_product_reviews_info) #{'Total': total, 'Real': total-fake, 'Fake': fake}

@app.route('/all-review-scores', methods=['POST'])
def all_review_scores():
    data = request.get_json()
    reviews = data['reviews']
    labels_and_scores = review_classifier.all_review_scores(reviews)
    return jsonify(labels_and_scores)


@app.route('/validate-product-update', methods=['POST'])
def validateProduct():
    if request.method == 'POST':
        # Get user inputs from the form
        text1 = request.form['text1']
        text2 = request.form['text2']
        file1 = request.files['image1']
        file2 = request.files['image2']
        
        # Validate and save image1
     
        filename1 = secure_filename(file1.filename)
        filepath1 = os.path.join(app.config['UPLOAD_FOLDER'], filename1)
        file1.save(filepath1)
        
        # Validate and save image2
     
        filename2 = secure_filename(file2.filename)
        filepath2 = os.path.join(app.config['UPLOAD_FOLDER'], filename2)
        file2.save(filepath2)
        
        # Now you can pass the inputs to the Gradio client1 predict function
        result = client1.predict(
            text1=text1,
            image1=handle_file(filepath1),
            text2=text2,
            image2=handle_file(filepath2),
            threshold=0.75,
            api_name="/predict"
        )
        
        # Return the result as JSON
        return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)