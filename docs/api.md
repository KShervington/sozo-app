# Sozo inFashion API Reference

# Table of Contents

[Description](#description)</br>
[Users](#users)</br>
[Products](#products)

## Description

Sozo's REST API is structured in a way that allows developers to easily fetch data, make user-specific updates, and understand the information being provided. All responses are in JSON format and use standard HTTP response codes.

| Base URL               |
| ---------------------- |
| `https://sozo.api.com` |

## Endpoints

```http
GET /users
GET /users/:email
POST /users
PATCH /users/:id
DELETE /users/:id

GET /products
GET /products/:id
POST /products
PATCH /products/:id
DELETE /products/:id
```

---

## Users

**GET** _/users_

Returns a list of all users.
| Parameter | Type | Description
| ----------- | :-----------: | ----------- |  
| limit | `integer` | `optional` Maximum number of users to return; Default is 10. |

**Response**

Returns an array of objects containing the following data.
| Key | Type | Description
| ----------- | :-----------: | ----------- |
| \_id | `string` | Unique value assigned when user is created in the database. |
| username | `string` | A user's display name; Also used for login. |
| email | `string` | A user's email address. |
| bio | `string` | A description of the user. |

**Example**

Request:

```http
GET /users?limit=2
```

Response:

```json
[
  {
    "_id": "66e76191c87d92bfc5b68348",
    "username": "DrewDream",
    "email": "dreamlife@yahoo.com",
    "bio": "Bold stitches, fierce fabrics. Transforming threads into masterpieces. 🧵✨ #FashionAlchemy #StyleVisionary"
  },
  {
    "_id": "66e773a8d84fc19d0aaf18ed",
    "username": "TaylorJ",
    "email": "taylor.joslin@gmail.com",
    "bio": "Dedicated to refining elegance through precision. Crafting timeless designs with meticulous attention to detail. Fashion designer focused on timeless style."
  }
]
```

---

**GET** _/users/:email_

Retrieve a single user account.
| Parameter |Type | Description
| ----------- | ----------- | ----------- |
| email | `string` | A user's email address. |

**Reponse**

Returns a single user object containing the following data.
| Key | Type | Description
| ----------- | :-----------: | ----------- |
| username | `string` | A user's display name. |
| email | `string` | A user's email address. |
| bio | `string` | A description of the user (max length: 200 characters). |
| createdAt | `string` | A `datetime` string showing when the user was created. |

**Example**

Request:

```http
GET /users/dreamlife@yahoo.com
```

Response:

```json
{
  "_id": "66e76191c87d92bfc5b68348",
  "username": "DrewDream",
  "email": "dreamlife@yahoo.com",
  "bio": "Bold stitches, fierce fabrics. Transforming threads into masterpieces. 🧵✨ #FashionAlchemy #StyleVisionary",
  "createdAt": "2024-09-15T22:39:13.838Z"
}
```

---

**POST** _/users_

Creates a new user account.
| Parameter | Type | Description
| ----------- | :-----------: | ----------- |  
| username | `string` | `required` User's display name. Does not allow special chatacters; Can be used for login. |
| email | `string` | `required` User's email address; Can be used for login. |
| password | `string` | `required` User's password to be be used for login. |
| bio | `string` | `optional` Description of the user (max length: 200 characters). |

**Response**

Returns a message and a single user object containing the following data.

| Key       | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| username  | `string` | User's display name.                                   |
| email     | `string` | User's email address.                                  |
| bio       | `string` | Description of the user.                               |
| createdAt | `string` | A `datetime` string showing when the user was created. |

**Example**

Request:

```http
POST /users
```

Request Body:

```json
{
  "username": "ReinaSantos",
  "email": "reina.santos@auto.com",
  "password": "kbcskdbjkJVJ7KBB^*b!",
  "bio": ""
}
```

Response:

```json
{
  "msg": "User created successfully",
  "user": {
    "username": "ReinaSantos",
    "email": "reina.santos@auto.com",
    "bio": "",
    "createdAt": "2024-09-29T18:42:07.426Z"
  }
}
```

---

**PATCH** /users/:id

Update parts of a user's profile information.
| Parameter | Type | Description
| ----------- | :-----------: | ----------- |  
| username | `string` | `optional` A user's display name. Does not allow special chatacters; Can be used for login. |
| email | `string` | `optional` A user's email address. |
| password | `string` | `optional` User's password to be be used for login. |
| bio | `string` | `optional` A description of the user. |

**Response**

Returns a message and a single user object containing the following data.

| Key       | Type     | Description                                                 |
| --------- | -------- | ----------------------------------------------------------- |
| \_id      | `string` | Unique value assigned when user is created in the database. |
| username  | `string` | User's display name.                                        |
| email     | `string` | User's email address.                                       |
| bio       | `string` | Description of the user.                                    |
| createdAt | `string` | A `datetime` string showing when the user was created.      |

**Example**

Request:

```http
PATCH /users/e5e7t3a8d44fc19d0aaf18ed
```

Request Body:

```json
{
  "username": "RSantos",
  "bio": "Sculpting sophistication in every stitch. Empowering women through distinctive designs. Committed to redefining style with grace and purpose."
}
```

Response:

```json
{
  "msg": "User details have been updated!",
  "user": {
    "_id": "e5e7t3a8d44fc19d0aaf18ed",
    "username": "RSantos",
    "email": "reina.santos@auto.com",
    "bio": "Sculpting sophistication in every stitch. Empowering women through distinctive designs. Committed to redefining style with grace and purpose.",
    "createdAt": "2024-09-29T18:42:07.426Z"
  }
}
```

---

**DELETE** _/users/:id_

Deletes a single user from the database.
| Parameter | Type | Description
| ----------- | :-----------: | ----------- |
| id | `string` | Unique value assigned when user is created in the database. |

**Reponse**

Returns a json object containing a message.
| Key | Type | Description
| ----------- | ----------- | ----------- |
| msg | `string` | States that the user was successfully deleted. |

**Example**

Request:

```http
DELETE /users/e5e7t3a8d44fc19d0aaf18ed
```

Response:

```json
{
  "msg": "User successfully removed"
}
```

---

## Products

**GET** /products

Returns a list of products.
| Parameter | Type | Description
| ----------- | :-----------: | ----------- |  
| limit | `integer` | `optional` Maximum number of products to return; Default is 20. |

**Response**

Returns an array of objects representing products. Each object contains the following data.
| Key | Type | Description
| ----------- | :-----------: | ----------- |
| \_id | `string` | Unique value assigned when product is created in the database. |
| name | `string` | A product's name. |
| price | `number` | A floating point number representing the price of the product. |
| description | `string` | A description of the product. |
| seller | `string` | The ID of the user who created the product. |

**Example**

Request:

```http
GET /products?limit=2
```

Response:

```json
[
  {
    "_id": "66f9fe05f5b15ee42aa6ae5b",
    "name": "Flip Flops",
    "price": 109.87,
    "description": "Formal brogues for business attire",
    "seller": "66f99f7f67c080cc3043afc2"
  },
  {
    "_id": "66f9fe05f5b15ee42aa6ae5e",
    "name": "Heels",
    "price": 80.96,
    "description": "Durable hiking boots for rugged trails",
    "seller": "66f99f7f67c080cc3043afc2"
  }
]
```

---

**GET** _/products/:id_

Retrieve a single product.
| Parameter |Type | Description
| ----------- | ----------- | ----------- |
| id | `string` | Unique value assigned when product is created in the database. |

**Reponse**

Returns a single product object containing the following data.
| Key | Type | Description
| ----------- | :-----------: | ----------- |
| \_id | `string` | Unique value assigned when product is created in the database. |
| name | `string` | A product's name. |
| price | `number` | A floating point number representing the price of the product. |
| description | `string` | A description of the product (max length: 400 characters). |
| image_url | `string` | An internal url that references the image of the product uploaded by the seller. |
| nftId | `string` | A unique ID representing the NFT created for the product. |
| seller | `string` | The ID of the user who created the product. |
| createdAt | `string` | A `datetime` string showing when the product was created. |

**Example**

Request:

```http
GET /products/66f9fe05f5b15ee42aa6ae61
```

Response:

```json
{
  "_id": "66f9fe05f5b15ee42aa6ae61",
  "name": "Hiking Boots",
  "price": 109.05,
  "description": "Lightweight running shoes for fitness",
  "imageUrl": "http://example.com/heels_image.jpg",
  "nftId": "unique-nft-id-5650",
  "seller": "66f99f7f67c080cc3043afc2",
  "createdAt": "2024-09-30T01:25:25.100Z",
  "__v": 0
}
```

---

**POST** /products

Creates a product.
| Parameter | Type | Description
| ----------- | :-----------: | ----------- |  
| name | `string` | A product's name. |
| price | `number` | A floating point number representing the price of the product. |
| image_url | `string` | An internal url that references the image of the product uploaded by the seller. |
| description | `string` | A description of the product (max length: 400 characters). |
| seller | `string` | The ID of the user who created the product. |

**Response**

Returns a message and a single product object containing the following data.
| Key | Type | Description
| ----------- | ----------- | ----------- |
| name | `string` | A product's name. |
| price | `number` | A floating point number representing the price of the product. |
| description | `string` | A description of the product (max length: 400 characters). |
| image_url | `string` | An internal url that references the image of the product uploaded by the seller. |
| nftId | `string` | A unique ID representing the NFT created for the product. |
| seller | `string` | The ID of the user who created the product. |
| \_id | `string` | Unique value assigned when product is created in the database. |
| createdAt | `string` | A `datetime` string showing when the product was created. |

**Example**

Request:

```http
POST /products
```

Request Body:

```json
{
  "name": "Cardigan",
  "description": "A sort of jacket that is terrible at keeping you warm but looks good.",
  "price": 35.69,
  "imageUrl": "http://example.com/cardigan_image.jpg",
  "nftId": "unique-nft-id-1656",
  "seller": "66f99e67619cad1068e2952b"
}
```

Response:

```json
{
  "msg": "Product created successfully",
  "product": {
    "name": "Cardigan",
    "price": 35.69,
    "description": "A sort of jacket that is terrible at keeping you warm but looks good.",
    "imageUrl": "http://example.com/cardigan_image.jpg",
    "nftId": "unique-nft-id-1656",
    "seller": "66f99e67619cad1068e2952b",
    "_id": "67171e7663e7624cd094afeb",
    "createdAt": "2024-10-22T03:39:34.945Z",
    "__v": 0
  }
}
```

---

**PATCH** _/products/:id_

Updates information for a specific piece.
| Parameter | Type | Description
| ----------- | :-----------: | ----------- |  
| name | `string` | `optional` A product's name. |
| price | `number` | `optional` A floating point number representing the price of the product. |
| description | `string` | `optional` A description of the product (max length: 400 characters). |
| image_url | `string` | `optional` An internal url that references the image of the product uploaded by the seller. |

**Response**

Returns a message and a single product object containing the following data.
| Key | Type | Description
| ----------- | ----------- | ----------- |
| \_id | `string` | Unique value assigned when product is created in the database. |
| name | `string` | `optional` A product's name. |
| price | `number` | `optional` A floating point number representing the price of the product. |
| description | `string` | `optional` A description of the product (max length: 400 characters). |
| image_url | `string` | `optional` An internal url that references the image of the product uploaded by the seller. |
| createdAt | `string` | A `datetime` string showing when the product was created. |

**Example**

Request:

```http
PATCH /products/66f9fe05f5b15ee42aa6ae6a
```

Request Body:

```json
{
  "name": "Formal Brogues",
  "price": 17.86
}
```

Response:

```json
{
  "msg": "Product details have been updated!",
  "product": {
    "_id": "66f9fe05f5b15ee42aa6ae6a",
    "name": "Formal Brogues",
    "price": 17.86,
    "description": "Formal brogues for business attire",
    "imageUrl": "http://example.com/heels_image.jpg",
    "createdAt": "2024-09-30T01:25:25.122Z"
  }
}
```

---

**DELETE** _/products/:id_

Deletes a single user from the database.
| Parameter | Type | Description
| ----------- | :-----------: | ----------- |
| id | `string` | Unique value assigned when user is created in the database. |

**Reponse**

Returns a json object containing a message.
| Key | Type | Description
| ----------- | ----------- | ----------- |
| msg | `string` | States that the product was successfully deleted. |

**Example**

Request:

```http
DELETE /products/67171e7663e7624cd094afeb
```

Response:

```json
{
  "msg": "Product successfully removed"
}
```
