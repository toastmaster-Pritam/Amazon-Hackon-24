
## API Reference

#### 1. BLOCKCHAIN APIs'

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

#### Send Ownership Transfer Email

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

#### 2. ML Model APIs'

#### Predict Logo
#### Endpoint

```http
POST POST /predict-logo
```

#### Request

- **URL**: `http://localhost:5000/predict-logo`
- **Method**: `POST`
- **Body**:  Form Data
  - `input_image (file)`: The image file of the logo to be predicted.
#### Example Request

```bash
curl -X POST http://localhost:5000/predict-logo
-F "input_image=@/path/to/your/image.png"
```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object with prediction results.
#### Example Response

```json
{
"confidences": [
{
"confidence": 0.9999997615814209,
"label": "Adidas Fake"
},
{
"confidence": 2.3929209191919654e-07,
"label": "Adidas Real"
}
],
"label": "Adidas Fake"
}

```


#### Predict Review
#### Endpoint

```http
POST POST /predict-review
```

#### Request

- **URL**: `http://localhost:5000/predict-review`

- **Method**: `POST`
- **Body**:   JSON
  - `review (string)`: The text of the review to be predicted.

#### Example Request

```bash
curl -X POST http://localhost:5000/predict-review
-H "Content-Type: application/json"
-d '{
"review": "This is a sample review text."
}'

```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object with prediction results.
#### Example Response

```json
{
"prediction": false
}

```

#### Rate Product
#### Endpoint

```http
POST /rate-product
```

#### Request

- **URL**: `http://localhost:5000/rate-product`

- **Method**: `POST`
- **Body**:   JSON
  - `reviews (array of strings)`: A list of reviews to be rated.


#### Example Request

```bash
curl -X POST http://localhost:5000/rate-product
-H "Content-Type: application/json"
-d '{
"reviews": [
"The product exceeded my expectations in every way.",
"Customer service was prompt and very helpful.",
"The quality of the material is outstanding."
]
}'


```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON object with the rating information.

#### Example Response

```json
{
"Fake": 2,
"Real": 3,
"Total": 5
}
```

#### Validate Product Update
#### Endpoint

```http
POST POST /validate-product-update
```

#### Request

- **URL**: `http://localhost:5000/validate-product-update`
- **Method**: `POST`
- **Body**:  Form Data
  - `text1 (string)`: The first text input.
  - `text1 (string)`: The second text input.
  - `image1 (string)`: The first image input.
  - `image2 (string)`: The second image input.

#### Example Request

```bash
curl -X POST http://localhost:5000/validate-product-update
-F "text1=Sample text 1"
-F "text2=Sample text 2"
-F "image1=@/path/to/your/image1.png"
-F "image2=@/path/to/your/image2.png"

```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON array with the validation result.
#### Example Response

```json
[
"0.8673202842473984",
"Valid"
]
```

#### Get All Review Scores
#### Endpoint

```http
POST /all-review-scores
```

#### Request

- **URL**: ` http://localhost:5000/all-review-scores`
- **Method**: `POST`
- **Body**: JSON
  - `reviews (array of strings)`: A list of review texts to be scored.

#### Example Request

```bash
curl -X POST http://localhost:5000/all-review-scores
-H "Content-Type: application/json"
-d '{
"reviews": [
"This book is very intresting and adventerous. Totally worth the money.",
"Useful bottle.",
"This bottle is very useful, good capacity and convenient",
"This bottle is very useful, holds a lot of water and is very easy to carry. 10/10",
"As an AI assistant, I can say that this bottle is very useful, good capacity and convenient"
]
}'


```

#### Response

- **Status Code**: `200 OK`
- **Content**: JSON array with scores for each review.

#### Example Response

```json
[
[
{
"label": "REAL",
"score": 0.9999524354934692
},
{
"label": "FAKE",
"score": 4.7615762014174834e-05
}
],
[
{
"label": "REAL",
"score": 0.9984057545661926
},
{
"label": "FAKE",
"score": 0.0015943024773150682
}
],
[
{
"label": "REAL",
"score": 0.9998070597648621
},
{
"label": "FAKE",
"score": 0.00019295947276987135
}
],
[
{
"label": "FAKE",
"score": 0.9997270703315735
},
{
"label": "REAL",
"score": 0.0002728579274844378
}
],
[
{
"label": "REAL",
"score": 0.999941349029541
},
{
"label": "FAKE",
"score": 5.862144098500721e-05
}
]
]
```





