import os
from flask import Flask, request, redirect, url_for, render_template,jsonify
import requests
from io import BytesIO
import sys
from gradio_client import Client, handle_file
from werkzeug.utils import secure_filename
sys.path.append('..')
from model_factory.review_classifier import Classifier




app = Flask(__name__)
client = Client("theArijitDas/Product-Update-Validator")

# Initialize the classifiers
review_classifier = Classifier(model_name='distilbert', return_bool=True)
# logo_classifier = LogoModel()  # Initialize your logo model here

 #{'Total': total, 'Real': total-fake, 'Fake': fake}

# @app.route('/predict-logo', methods=['POST'])
# def predict_logo():
#     data = request.get_json()
#     logo_data = data['logo']
#     prediction = logo_classifier.predict(logo_data)  # Assuming your logo model has a predict method
#     return jsonify({'prediction': prediction})

@app.route('/predict-review', methods=['POST'])
def predict_review():
    data = request.get_json()
    review_text = data['review']
    prediction = review_classifier.hybrid_classify(review_text)  # Use hybrid_classify or other method as needed
    return jsonify({'prediction': prediction})

@app.route('/rate-product', methods=['POST'])
def predict_review():
    data = request.get_json()
    reviews = data['reviews']
    product_reviews_info = review_classifier.rate_product(reviews, return_frac=False)  # Use hybrid_classify or other method as needed
    return jsonify(product_reviews_info) #{'Total': total, 'Real': total-fake, 'Fake': fake}


UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


@app.route('/validate', methods=['POST'])
def upload_file():
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
        
        # Now you can pass the inputs to the Gradio client predict function
        result = client.predict(
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