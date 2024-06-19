from flask import Flask, request, jsonify
import sys
import os

# Add the paths to your modules
sys.path.append('../fake_review_detection')
# sys.path.append('../fake-logo-detection')

from classifier import Classifier
# from model import LogoModel  # Assuming you have a similar class for the fake-logo-detection

app = Flask(__name__)

# Initialize the classifiers
review_classifier = Classifier(model_name='distilbert', return_bool=True)
# logo_classifier = LogoModel()  # Initialize your logo model here

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
    fake, total = review_classifier.rate_product(reviews, return_frac=False)  # Use hybrid_classify or other method as needed
    return jsonify({'fake': fake, 'total': total})

# @app.route('/predict-logo', methods=['POST'])
# def predict_logo():
#     data = request.get_json()
#     logo_data = data['logo']
#     prediction = logo_classifier.predict(logo_data)  # Assuming your logo model has a predict method
#     return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)