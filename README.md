# FAKE REVIEWS & COUNTERFEIT PRODUCT DETECTION

## Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.com/toastmaster-Pritam"><img src="https://avatars.githubusercontent.com/u/102214990?v=4" width="50px;" alt="Pritam"/><br /><sub><b>Pritam</b></sub></a></td>
    <td align="center"><a href="https://github.com/theArijitDas"><img src="https://avatars.githubusercontent.com/u/116800444?v=4" width="50px;" alt="Arijit"/><br /><sub><b>Arijit</b></sub></a></td>
    <td align="center"><a href="https://github.com/Its-SSN"><img src="https://avatars.githubusercontent.com/u/116066011?v=4" width="50px;" alt="Saumya"/><br /><sub><b>Saumya</b></sub></a></td>
    <td align="center"><a href="https://github.com/piyushjain4"><img src="https://avatars.githubusercontent.com/u/102512290?v=4" width="50px;" alt="Piyush"/><br /><sub><b>Piyush</b></sub></a></td>
  </tr>
</table>

## Table of Contents

1. [Fake Review Detection & Product Update Validation](#1-fake-review-detection--product-update-validation)
    - [A. Fake Review Detection](#a-fake-review-detection)
    - [B. Product Update Validation](#b-product-update-validation)
2. [Fake Logo Detection](#2-fake-logo-detection)
- [Model Demo Notebooks](#model-demo-notebooks)
- [Gradio Demos](#gradio-demos)
3. [Supply Chain Transparency with Blockchain](#3-supply-chain-transparency-with-blockchain)
4. [Setup for Backend and Frontend Services](#4-setup-for-backend-and-frontend-services)



## 1. Fake Review Detection & Product Update Validation
**Contributor:** [Arijit](https://github.com/theArijitDas)

### A. Fake Review Detection
#### Description

This module leverages a fine-tuned version of [distilbert-base-uncased](https://huggingface.co/distilbert-base-uncased) to detect and classify fake reviews. The model is fine-tuned on the [Fake Reviews Dataset](https://huggingface.co/datasets/theArijitDas/Fake-Reviews-Dataset), which includes 20k fake reviews, 20k real product reviews and additional 94 AI generated data-points.

- Label=**0**: Original reviews (presumably human-created and authentic)
- Label=**1**: Computer-generated fake reviews

### Usage
The fine-tuned model is encapsulated in a `model_factory/review_classifier.py` that streamlines the detection and classification of fake reviews.

### B. Product Update Validation

#### Description
This module addresses the issue of sellers updating product listings to inherit positive reviews from previous versions, which can mislead customers. It consists of two validators:

- `model_factory/description_validator.py`: Checks the similarity between the product descriptions.
- `model_factory/image_validator.py`: Checks the similarity between the product images.

These validators are combined in `model_factory/product_update_validator.py` to provide a comprehensive validation check for product updates.

#### Models
For text similarity, the following models from Hugging Face are available:

- [MPNet-base-v2](https://huggingface.co/sentence-transformers/all-mpnet-base-v2)
- [DistilRoBERTa-v1](https://huggingface.co/sentence-transformers/all-distilroberta-v1)
- [MiniLM-L12-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L12-v2)
- [MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2)

For image similarity, the following models are available:

- [CLIP-ViT Base](https://huggingface.co/openai/clip-vit-base-patch32)
- [ViT Base](https://huggingface.co/google/vit-base-patch16-224)
- [DINO ViT-S16](https://huggingface.co/facebook/dino-vits16)

### Usage
The combined validator can be used to check both text and image similarities for product updates, while the individual validators for description and image can be used seperately as well.


## 2. Fake Logo Detection
**Contributor:** [Piyush](https://github.com/piyushjain4)

### Description
This module leverages deep learning to distinguish between authentic and counterfeit logos, helping to combat brand infringement and maintain brand integrity.
The Training dataset contains approximately 1.5k images for each brand ,with approximately 800 real logos and 800 fake logos.

> #### Note: The model is specifically trained to detect fake logos for the following brands: Adidas, Puma, Allen Solly, and US Polo.

### Model Architecture
The model is built using the Inception v3 architecture, which is a widely used convolutional neural network designed for image classification tasks. The model is pre-trained on ImageNet for better feature extraction and fine-tuned on the [fake and real logo dataset](https://huggingface.co/datasets/ravikagitha/ClothesBrandLogos) for Adidas, Puma, Allen Solly, and US Polo.

### Usage
The model is encapsulated in the `model_factory/fake_logo_detector.py` module to facilitate easy classification of fake and real logos.

> ### Model Demo Notebooks
> A separate folder `model_demo_notebooks/` contains Jupyter notebooks demonstrating how to use each module. These notebooks provide step-by-step examples and usage scenarios to help you get started quickly.
><br><br>

> ### Gradio Demos
>
> Interactive demos for all models are available on Hugging Face Spaces, built using Gradio. These demos allow you to play around with the models and make API calls.
> - [Fake Review Detection](https://huggingface.co/spaces/theArijitDas/Fake-Review-Detection)
> - [Product Description Similarity](https://huggingface.co/spaces/theArijitDas/Product-Description-Similarity)
> - [Product Image Similarity](https://huggingface.co/spaces/theArijitDas/Product-Image-Similarity)
> - [Product Update Validator](https://huggingface.co/spaces/theArijitDas/Product-Update-Validator)
> - [Fake Logo Detection](https://huggingface.co/spaces/piyushjain4/fake_logo_detection)
> <br><br>

> ### Installation
>To install the required dependencies, run:
>```bash
>pip install -r requirements.txt
>```
>
> For 'Product Update Validation' and 'Fake Logo Detection' we use the Gradio API hosted on Huggingface spaces.
> To use these models locally, also install additional dependencies, run:
> ```bash
> pip install -r local_requirements.txt
> ```
> <br>
## 3. Supply Chain Transparency with Blockchain
**Contributor:** [Pritam](https://github.com/toastmaster-Pritam)

### Overview
In this project, we aimed to enhance supply chain transparency by leveraging blockchain technology. Our solution ensures the traceability and immutability of records, providing a robust mechanism to track products from their origin to the end consumer.

### Key Functions Implemented in the Smart Contract

1. ```solidity
   function admin() external view returns (address)
   ```
   - Returns the address of the current admin.

2. ```solidity
   function approveOwnership(bytes32 _uniqueHash) external
   ```
   - Approves the ownership transfer of a product identified by its unique hash.

3. ```solidity
   function brandCounter() external view returns (uint256)
   ```
   - Returns the total number of registered brands.

4. ```solidity
   function getAllBrands() external view returns (tuple[])
   ```
   - Retrieves a list of all registered brands.

5. ```solidity
   function getAllManufacturerBrands(address _manufacturerAddress) external view returns (tuple[])
   ```
   - Retrieves all brands associated with a specific manufacturer.

6. ```solidity
   function getAllManufacturerProducts(address _manufacturerAddress) external view returns (tuple[])
   ```
   - Retrieves all products associated with a specific manufacturer.

7. ```solidity
   function getIPFSHash(string _brandName) external view returns (string)
   ```
   - Returns the IPFS hash of a brand's details by its name.

8. ```solidity
   function getProductDetails(bytes32 _uniqueHash) external view returns (tuple)
   ```
   - Retrieves detailed information about a product using its unique hash.

9. ```solidity
   function getProductOwners(bytes32 _uniqueHash) external view returns (tuple[])
   ```
   - Returns the ownership history of a product.

10. ```solidity
    function getUserDetails(address _userAddress) external view returns (tuple)
    ```
    - Retrieves detailed information about a user using their address.

11. ```solidity
    function isAdmin(address _address) external view returns (bool)
    ```
    - Checks if an address belongs to an admin.

12. ```solidity
    function isBrandStored(string _brandName) external view returns (bool)
    ```
    - Checks if a brand is already registered by its name.

13. ```solidity
    function productCounter() external view returns (uint256)
    ```
    - Returns the total number of registered products.

14. ```solidity
    function registerBrand(string _name, string _logoIpfsHash) external returns (bytes32)
    ```
    - Registers a new brand with a name and logo stored on IPFS.

15. ```solidity
    function registerProduct(string _name, string _details, bytes32 _brandId, string _image) external returns (bytes32)
    ```
    - Registers a new product under a specified brand.

16. ```solidity
    function registerUser(uint8 _role, string _name, string _email, string _phoneNumber) external
    ```
    - Registers a new user with specified role, name, email, and phone number.

17. ```solidity
    function removeWhitelistedBrand(bytes32 _brandId) external
    ```
    - Removes a brand from the whitelist.

18. ```solidity
    function requestOwnership(bytes32 _uniqueHash) external
    ```
    - Requests ownership transfer of a product using its unique hash.

19. ```solidity
    function verifyProduct(bytes32 _uniqueHash) external view returns (bool)
    ```
    - Verifies the authenticity of a product using its unique hash.

20. ```solidity
    function whitelistBrand(bytes32 _brandId) external
    ```
    - Adds a brand to the whitelist.

## 4. Setup for Backend and Frontend Services
**Contributor:** [Saumya](https://github.com/Its-SSN) | [Pritam](https://github.com/toastmaster-Pritam)

#### Backend Setup
1. **Navigate to the backend directory:**
   ```sh
   cd /path/Amazon \hackon/amazon-backend/
   ```
2. **Install the required dependencies:**
   ```sh
   npm install
   ```
3. **Run the backend service:**
   ```sh
   npm run dev
   ```
4. **Contract Deployment**
```sh
npx hardhat compile
```
```sh
npx hardhat run scripts/deploy.js
```
5. **Run the Flask backend server:**
```sh
cd /path/Amazon \hackon/flask-backend/
  ```   
   ```sh
   Linux/WSL: python3 app.py
   CMD/Powershell: python app.py
   ```   

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in root of amazon-backend

`RPC_URL`
`PRIVATE_KEY`
`CONTRACT_ADDRESS`
`PORT`
`CLOUDINARY_CLOUD_NAME`
`CLOUDINARY_API_KEY`
`CLOUDINARY_API_SECRET`
`FRONTEND_URL`
`SMPT_PASSWORD`
`SMPT_SERVICE`
`SMPT_MAIL`
`SMPT_HOST`
`SMPT_PORT`

#### Frontend Setup
1. **Navigate to the frontend directory:**
   ```sh
   cd /path/Amazon \hackon/amazon-frontend/
   ```
2. **Install the required dependencies:**
   ```sh
   npm install
   ```
3. **Run the frontend service:**
   ```sh
   npm run dev
   ```
## Environment Variables
To run this project, you will need to add the following environment variables to your .env file in root of amazon-frontend   
`NEXT_PUBLIC_CONTRACT_ADDRESS`
`NEXT_PUBLIC_BACKEND_URL`   

### Metamask Installation and Testnet setup
To interact with blockchain features, you will need to install Metamask, a browser extension for managing Ethereum-based applications.

1. **Go to the [Metamask website](https://metamask.io/).**
2. **Click "Download" and follow the instructions to add the extension to your browser.**
3. **Create a new wallet or import an existing one using your seed phrase.**
4. **Add Test network in your wallet (This project uses Volta Test RPC)**


### Website Demo Picture
![Website Demo](path/to/demo/picture.png)

Feel free to replace the placeholder paths and image links with the actual ones used in your project.
