# Overall Project Title

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

## API Reference

#### Get brand image url
#### Endpoint

```http
GET /admin/getIPFSHash/${brandName}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `brandName` | `string` | **Required**. brandName |

#### Example Request

```bash
localhost:5000/api/admin/getIPFSHash/rolex
```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object.

#### Example Response

```json
{
    "success": true,
    "url": "https://res.cloudinary.com/dbqz506c2/image/upload/v1718959255/ghl1u3ojfwqqlrwpnoyv.jpg"
}
```

#### Get status of brand being stored in blockchain
#### Endpoint

```http
GET /api/brand/isBrandStored/${brandname}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `brandName`      | `string` | **Required**. brandName to fetch |

#### Example Request

```bash
localhost:5000/api/brand/isBrandStored/puma
```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object.

#### Example Response

```json
{
    "success": true,
    "stored": true
}
```

#### verify authenticity of product
#### Endpoint

```http
GET /api/product/${hash}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `hash`      | `bytes32 string` | **Required**. uniqueHash to check authenticity |

#### Example Request

```bash
localhost:5000/api/product/verifyProduct/0x5fa04869c34088327eb4b8a33a4de49e21c29be1d3dcd39fab1625ee992dbecf
```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object.

#### Example Response

```json
{
    "success": true,
    "verified": true
}
```

#### Get Owner History
#### Endpoint

```http
GET /api/product/getOwnerHistory/${hash}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `hash`      | `bytes32 string` | **Required**. uniqueHash to fetch owner history |

#### Example Request

```bash
localhost:5000/api/product/getOwnerHistory/0x5fa04869c34088327eb4b8a33a4de49e21c29be1d3dcd39fab1625ee992dbecf
```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object.

#### Example Response

```json
{
    "success": true,
    "history": [
        "1,0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5"
    ]
}
```

#### Get Product Details
#### Endpoint

```http
GET /api/product/getProductDetails/${hash}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `hash`      | `bytes32 string` | **Required**. uniqueHash to fetch product details |

#### Example Request

```bash
localhost:5000/api/product/getProductDetails/0x5fa04869c34088327eb4b8a33a4de49e21c29be1d3dcd39fab1625ee992dbecf
```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object.

#### Example Response

```json
{
    "success": true,
    "product": [
        "0x765e00776744255a99c0b1c2a5402ae607895e14c0fa3ca9487a65adc16ea44e",
        "puma shoe",
        "0x17931a92e6880de7275006a30f08184529c173140e5341a7888f078e396b86b0",
        "0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5",
        "0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5",
        "black color puma sports shoe",
        "0x5fa04869c34088327eb4b8a33a4de49e21c29be1d3dcd39fab1625ee992dbecf",
        false,
        "https://res.cloudinary.com/dbqz506c2/image/upload/v1718982688/s7lgkhrn4symqhkmnv4k.webp"
    ]
}

```


#### Get all products by a particular Manufacturer
#### Endpoint

```http
GET /api/product/all/${address}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `address`      | `address string` | **Required**.wallet address of Manufacturer |

#### Example Request

```bash
localhost:5000/api/product/all/0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5
```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object.

#### Example Response

```json
{
    "success": true,
    "products": [
        [
            "0x9af6183f9c4589ed1f044fca72cf740173c8830368395d180c1d75a7746eb75a",
            "rolex watch golden",
            "0x72f23cb8415d99ed5b7e0ed4107988f10377cf934ac1d556331dba791c4d4007",
            "0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5",
            "0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5",
            "beautiful rolex watch in golden color and embrodery",
            "0xf5a027e82844f9be96b857ba4639045d474beab5c857df5f9adcba5e365df278",
            false,
            "https://res.cloudinary.com/dbqz506c2/image/upload/v1718959498/cmeoamcui6ybq9amzqro.webp"
        ],
        [
            "0x765e00776744255a99c0b1c2a5402ae607895e14c0fa3ca9487a65adc16ea44e",
            "puma shoe",
            "0x17931a92e6880de7275006a30f08184529c173140e5341a7888f078e396b86b0",
            "0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5",
            "0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5",
            "black color puma sports shoe",
            "0x5fa04869c34088327eb4b8a33a4de49e21c29be1d3dcd39fab1625ee992dbecf",
            false,
            "https://res.cloudinary.com/dbqz506c2/image/upload/v1718982688/s7lgkhrn4symqhkmnv4k.webp"
        ]
    ]
}
```

#### Get all brands registered by a Manufacturer
#### Endpoint

```http
GET /api/brand/all/${address}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `address`      | `address string` | **Required**.wallet address of Manufacturer |

#### Example Request

```bash
localhost:5000/api/brand/all/0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5
```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object.

#### Example Response

```json
{
    "success": true,
    "brands": [
        [
            "0x17931a92e6880de7275006a30f08184529c173140e5341a7888f078e396b86b0",
            "puma",
            "0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5",
            true,
            "https://res.cloudinary.com/dbqz506c2/image/upload/v1718959186/whcufgwdmjsow2idpjkn.jpg"
        ],
        [
            "0x72f23cb8415d99ed5b7e0ed4107988f10377cf934ac1d556331dba791c4d4007",
            "rolex",
            "0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5",
            true,
            "https://res.cloudinary.com/dbqz506c2/image/upload/v1718959255/ghl1u3ojfwqqlrwpnoyv.jpg"
        ]
    ]
}

```

#### Get all brands registered in blockchain
#### Endpoint

```http
GET /api/brand/all
```



#### Example Request

```bash
localhost:5000/api/brand/all
```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object.

#### Example Response

```json
{
    "success": true,
    "brands": [
        [
            "0x17931a92e6880de7275006a30f08184529c173140e5341a7888f078e396b86b0",
            "puma",
            "0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5",
            true,
            "https://res.cloudinary.com/dbqz506c2/image/upload/v1718959186/whcufgwdmjsow2idpjkn.jpg"
        ],
        [
            "0x72f23cb8415d99ed5b7e0ed4107988f10377cf934ac1d556331dba791c4d4007",
            "rolex",
            "0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5",
            true,
            "https://res.cloudinary.com/dbqz506c2/image/upload/v1718959255/ghl1u3ojfwqqlrwpnoyv.jpg"
        ],
        [
            "0xb7db32e45c9bc09198b3f02cd16f65eaeeac9c90fa5f8b27f1b3092c96b754f3",
            "adidas",
            "0x4a946302A736AC270D97F4E47678CD10733DB3Ee",
            true,
            "https://res.cloudinary.com/dbqz506c2/image/upload/v1719000986/fnyky4faq7snyjvllgfu.png"
        ]
    ]
}
```


#### Get user details of registered users
#### Endpoint

```http
GET /api/user/details/${address}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `address`      | `address string` | **Required**.wallet address of user |

#### Example Request

```bash
localhost:5000/api/user/details/0x8Ac802dB7276a9A6A56e5f1d54594829c6734Fb5
```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object.

#### Example Response

```json
{
    "success": true,
    "user": [
        "1",
        "test",
        "test@gmail.com",
        "12345"
    ]
}
```


#### Check if User is Admin
#### Endpoint

```http
GET /api/user/isAdmin/${address}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `address`      | `address string` | **Required**.wallet address of user |

#### Example Request

```bash
localhost:5000/api/user/isAdmin/0x1D43Ce30c2aE229A7eAc3479fE0a7882Afd4795F
```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object.

#### Example Response

```json
{
    "success": true,
    "admin": false
}
```

#### upload image to cloudinary


#### Endpoint

```http
POST /api/brand/uploadBrandLogo
```

#### Request

- **URL**: `http://localhost:5000/api/brand/uploadBrandLogo`
- **Method**: `POST`
- **Body**: Multipart/form-data
  - `brandLogo`: A file field that contains the brand logo to be uploaded.

#### Example Request
```bash
curl -X POST http://localhost:5000/api/brand/uploadBrandLogo \
  -F "brandLogo=@/path/to/your/brandLogo.png"
```


#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object with details of the upload status.

#### Example Response

```json
{
    "success": true,
    "url": "https://res.cloudinary.com/dbqz506c2/image/upload/v1719026533/pf4gbg67xdboo5lqp8j4.png"
}
```

### Send Ownership Transfer Email

#### Endpoint

```http
POST /api/admin/ownerShipTransferEmail
```

#### Request

- **URL**: `http://localhost:5000/api/admin/ownerShipTransferEmail`
- **Method**: `POST`
- **Body**: JSON
  - `name` (string): Name of the recipient.
  - `email` (string): Email address of the recipient.
  - `uniqueHash` (string): Unique hash for the transfer.
  - `requesterAddress` (string): Address of the requester.
  - `requesterName` (string): Name of the requester.
  - `productId` (string): ID of the product.
  - `productName` (string): Name of the product.
  - `brandId` (string): ID of the brand.
  - `productImage` (string): URL of the product image.

#### Example Request

```bash
curl -X POST http://localhost:5000/api/admin/ownerShipTransferEmail \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rohan",
    "email": "example@gmail.com",
    "uniqueHash": "123456abcdef",
    "requesterAddress": "0x12345abcde67890fghij1234567890klmnopqrstu",
    "requesterName": "John Doe",
    "productId": "9876543210",
    "productName": "Acme Deluxe Widget",
    "brandId": "acme123",
    "productImage": "https://res.cloudinary.com/dbqz506c2/image/upload/v1718982688/s7lgkhrn4symqhkmnv4k.webp"
  }'
```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object with details of the email status.

#### Example Response

```json
{
  "success": true,
  "message": "Ownership transfer email sent successfully"
}
```



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