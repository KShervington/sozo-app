# Sozo inFashion API Reference

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

GET /jobs/{job_id}
POST /jobs/create
POST /jobs/{job_id}/cancel

GET /pieces
GET /pieces/{piece_id}
POST /pieces/create
PATCH /pieces/{piece_id}
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
  "username": "DrewDream",
  "email": "taylor.joslin@gmail.com",
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

## Jobs

**GET** _/jobs/{job_id}_

Retrieve details of a single job, established between a client and designer user.
| Parameter |
| ----------- |  
| No parameters |

**Reponse**

Returns a single job object containing the following data.
| Key | Type | Description
| ----------- | :-----------: | ----------- |
| job_id | `string` | Unique value assigned when a job is created. |
| client_id | `string` | Client user's unique id. |
| designer_id | `string` | Designer user's unique id. |
| payment_status | `string` | Status of payment for job. Possible values are `not paid` `pending` or `paid`. |
| active_status | `number` | 1 indicates **active** **OR** 0 indicates **not active** |

**Example**

Request:

```http
GET /jobs/uD7uQ4xjuCT9spwhyNVRxiYk9
```

Response:

```json
{
  "job_id": "uD7uQ4xjuCT9spwhyNVRxiYk9",
  "client_id": "Hfkq7urNonHMonGREKU3",
  "designer_id": "hTwR4QEXHYPf7Ua6tjjM",
  "payment_status": "not paid",
  "active_status": 1
}
```

---

**POST** _/jobs/create_

Creates a new job.
| Parameter | Type | Description
| ----------- | :-----------: | ----------- |  
| client_id | `string` | `required` Client user's unique id. |
| designer_id | `string` | `required` Designer user's unique id. |

**Response**

Returns a single job object containing the following data.

| Key            | Type     | Description                                                                    |
| -------------- | -------- | ------------------------------------------------------------------------------ |
| job_id         | `string` | Unique value assigned when a job is created.                                   |
| client_id      | `string` | A client user's unique id.                                                     |
| designer_id    | `string` | A designer user's unique id.                                                   |
| payment_status | `string` | Status of payment for job. Possible values are `not paid` `pending` or `paid`. |
| active_status  | `number` | Indicates whether a job is active; 1 is **active** **OR** 0 is **not active**  |

**Example**

Request:

```http
POST /jobs/create
```

Request Body:

```json
{
  "client_id": "Hfkq7urNonHMonGREKU3",
  "designer_id": "hTwR4QEXHYPf7Ua6tjjM"
}
```

Response:

```json
{
  "job_id": "uD7uQ4xjuCT9spwhyNVRxiYk9",
  "client_id": "Hfkq7urNonHMonGREKU3",
  "designer_id": "hTwR4QEXHYPf7Ua6tjjM",
  "payment_status": "not paid",
  "active_status": 1
}
```

---

**POST** _/jobs/{job_id}/cancel_

Cancels an active job; The job must be in a cancelabe state (active_status == 1 && payment_status == "not paid").
| Parameter |
| ----------- |  
| No parameters |

**Reponse**

Returns a single job object if the request was successful. Returns an error if the job is not in a cancelable state.
| Key | Type | Description
| ----------- | :-----------: | ----------- |
| job_id | `string` | Unique value assigned when a job is created. |
| client_id | `string` | A client user's unique id. |
| designer_id | `string` | A designer user's unique id. |
| payment_status | `string` | Status of payment for job. Possible values are `not paid` `pending` or `paid`. |
| active_status | `number` | 1 indicates **active** **OR** 0 indicates **not active** |

**Example**

Request:

```http
POST /jobs/{job_id}/cancel
```

Response:

```json
{
  "job_id": "uD7uQ4xjuCT9spwhyNVRxiYk9",
  "client_id": "Hfkq7urNonHMonGREKU3",
  "designer_id": "hTwR4QEXHYPf7Ua6tjjM",
  "payment_status": "not paid",
  "active_status": 0
}
```

---

## Pieces

**GET** _/pieces_

Returns a list of all designer users.
| Parameter | Type | Description
| ----------- | :-----------: | ----------- |  
| limit | `integer` | `optional` Maximum number of designer users to return; Default is 20. |

**Response**

Returns an array of objects representing pieces created by designers. Each object contains the following data.
| Key | Type | Description
| ----------- | :-----------: | ----------- |
| piece_id | `string` | Unique value assigned when a piece in the database. |
| designer_id | `string` | A designer user's unique id. |
| piece_name | `string` | A piece's name. Determined by the designer. |
| image_name | `string` | Name of the image uploaded for the piece. |
| description | `string` | A description of the piece. |

**Example**

Request:

```http
GET /pieces?limit=2
```

Response:

```json
[
  {
    "piece_id": "hgmjw3vx4bfnQs9",
    "designer_id": "hTwR4QEXHYPf7Ua6tjjM",
    "piece_name": "Stars & Spangles",
    "image_name": "hgmjw3vx4bfnQs9.jpg",
    "description": "Unveiling the \"Stars & Spangles\" hoodie: a premium cotton masterpiece embodying the spirit of the United States. Vibrant stars and stripes meticulously dance across this garment, a dynamic celebration of American pride. Perfect for Independence Day or any occasion, this hoodie seamlessly merges style with patriotism. Wear the colors that echo the nation's heartbeat, making the Stars & Spangles a timeless symbol of your love for the land of the free."
  },
  {
    "piece_id": "AgiUjJGhhKtX3oY",
    "designer_id": "NRDF8FB61BuYThN2scFA",
    "piece_name": "Stars & Spangles",
    "image_name": "AgiUjJGhhKtX3oY.jpg",
    "description": "\"The Raven's Veil\" is a bewitching cloak that cascades in mysterious ebony folds. Embroidered ravens soar across the midnight fabric, their feathers intricately detailed in silver thread. The garment whispers tales of ancient lore, weaving elegance with an enigmatic edge. Embrace the mystique, as the Raven's Veil envelops you in a silhouette of shadowed allure."
  }
]
```

---

**POST** _/pieces/create_

Creates a piece.
| Parameter | Type | Description
| ----------- | :-----------: | ----------- |  
| piece_name | `string` | `required` A piece's name. |
| image_name | `string` | `required` Name of the image uploaded for the piece. |
| description | `string` | `optional` A description of the piece (max length: 400 characters). |

**Response**

Returns a single piece object containing the following data.
| Key | Type | Description
| ----------- | ----------- | ----------- |
| piece_id | `string` | Unique value assigned when a piece in the database. |
| designer_id | `string` | A designer user's unique id. |
| piece_name | `string` | A piece's name. Determined by the designer. |
| image_name | `string` | Name of the image uploaded for the piece. |
| description | `string` | A description of the piece. |

**Example**

Request:

```http
POST /users/create
```

Request Body:

```json
{
  "piece_name": "Red Monty",
  "image_name": "IMG_46.jpg",
  "description": ""
}
```

Response:

```json
{
  "piece_id": "1rjJDBYmLo5pgT7",
  "designer_id": "YRmNWCQuQdAWbR8u7eP4",
  "piece_name": "Red Monty",
  "image_name": "1rjJDBYmLo5pgT7.jpg",
  "description": ""
}
```

---

**PATCH** _/pieces/{piece_id}_ HTTP/1.1

Updates information for a specific piece.
| Parameter | Type | Description
| ----------- | :-----------: | ----------- |  
| piece_name | `string` | `optional` A piece's name. |
| image_name | `string` | `optional` Name of the image uploaded for the piece. |
| description | `string` | `optional` A description of the piece (max length: 400 characters). |

**Response**

Returns a single piece object containing the following data.
| Key | Type | Description
| ----------- | ----------- | ----------- |
| piece_id | `string` | Unique value assigned when a piece in the database. |
| designer_id | `string` | A designer user's unique id. |
| piece_name | `string` | A piece's name. Determined by the designer. |
| image_name | `string` | Name of the image uploaded for the piece. |
| description | `string` | A description of the piece. |

**Example**

Request:

```http
PATCH /users/H094iAjZyPWr4rm0y9WL
```

Request Body:

```json
{
  "piece_name": "Red Python",
  "description": "This sizzling masterpiece entwines the fierce allure of red with a sleek python pattern. The sultry silhouette, adorned with glistening serpent scales, invites you to embrace the wild side. A bold statement, embodying passion and power in every slither."
}
```

Response:

```json
{
  "piece_id": "1rjJDBYmLo5pgT7",
  "designer_id": "YRmNWCQuQdAWbR8u7eP4",
  "piece_name": "Red Python",
  "image_name": "1rjJDBYmLo5pgT7.jpg",
  "description": "This sizzling masterpiece entwines the fierce allure of red with a sleek python pattern. The sultry silhouette, adorned with glistening serpent scales, invites you to embrace the wild side. A bold statement, embodying passion and power in every slither."
}
```
