# Kitra API Documentation
This repository contains the Kitra Game API, which allows users to collect treasures based on geographical coordinates. The API is backed by a MySQL database that stores user information, treasure locations, and associated monetary values.


## Description
This API allows users to find treasure boxes within a specified distance and prize value using geographical coordinates.


## Base URL

- Development: http://localhost:3000/
- Production: https://kitra.wlabesamis.website/


## Endpoints

### Authentication
#### POST `/api/auth/login`

- Description: Authenticates the user and returns a JWT token.
- Request:
    - Body:
        ```
        {
        "username": "string",
        "password": "string"
        }
        ```
    - Response:
        - 200 OK:
        ```
        {
        "status": "success",
        "message": "Login successful",
        "token": "jwt_token"
        }
        ```
        - 400 Bad Request:
         ```
        {
        "errors": {[
                {},
                {}
            ]}
        }
        ```
        - 401 Unauthorized:
         ```
        {
        "status": "error",
        "message": "Invalid email or password"
        }
        ```

### Treasures
#### GET `/api/treasures`
- Description: Retrieves treasures without requiring authorization, within a specified distance and prize value.
- Query Parameters:
    - latitude (float): Latitude of the user's input.
    - longitude (float): Longitude of the user's input.
    - distance (float): Maximum distance from the user's input.
    - prizeValue (float): prize value of treasures.
- Response:
    - 200 OK:
        ```
        {
        "status": "success",
        "message": "Results found",
        "data": [
            {
            "id": int,
            "name": "string",
            "latitude": "float",
            "longitude": "float",
            "prizeValue": int
            }
        ]
        }
        ```
    - 400 Bad Request:
        ```
        {
        "errors": [
            {
            "type": "string",
            "value": "string",
            "msg": "string",
            "path": "string",
            "location": "string"
            }
        ]
        }
        ```

#### GET `/api/v2/treasures`
- Description: Retrieves treasures within a specified distance and prize value, requires authorization.
- Headers:
    - Authorization: Bearer <jwt_token>
- Query Parameters:
    - latitude (float): Latitude of the user's input.
    - longitude (float): Longitude of the user's input.
    - distance (float): Maximum distance from the user's input.
    - prizeValue (float): prize value of treasures.
- Response:
    - 200 OK:
        ```
        {
        "status": "success",
        "message": "Results found",
        "data": [
            {
            "id": int,
            "name": "string",
            "latitude": "float",
            "longitude": "float",
            "prizeValue": int
            }
        ]
        }
        ```
    - 400 Bad Request:
        ```
        {
        "errors": [
            {
            "type": "string",
            "value": "string",
            "msg": "string",
            "path": "string",
            "location": "string"
            }
        ]
        }
        ```
    - 401 Unauthorized:
        ```
        {
            "error": "Unauthorized",
            "message": "No valid token provided. Authentication required."
        }
        ```
    - 403 Forbidden:
        ```
        {
            "error": "Forbidden",
            "message": "Invalid token or insufficient permissions."
        }
        ```
## Swagger Documentation
 - Access the full Swagger documentation
    - Development: http://localhost:3000/api-docs
    - Production: https://kitra.wlabesamis.website/api-docs

# Installation Guidlines
## Prerequisites
 Before you can run the application, make sure you have the following installed on your system:

## 1. Setup your Mysql Server:
- visit this readme File: https://github.com/wlabesamis/mysql-server/blob/main/README.md


## 2. Setup API

1. Clone the repository.
    > git clone https://github.com/wlabesamis/kitra-api
2. Install dependencies: `npm install`.
3. Set up `.env` with your database credentials.
    ```
    DB_HOST=localhost
    DB_USER=kitra_user
    DB_PASSWORD=kitra_password
    DB_NAME=kitra_db
    PORT=3000
    ```
4. Run the server: `npm start`.

## 3. Testing

Run tests using Jest:
```bash
npm test
```

## 4. Code documentation (JSDoc Documentation)
This project uses JSDoc comments to document the codebase, ensuring clarity and ease of maintenance. To generate HTML documentation from these comments:

### 1. Install JSDoc:

```
npm install -g jsdoc
```

### 2. Generate Documentation:
 Run the following command in your project directory:

```
jsdoc ./ -r -d jsdocs
```
- ./: Specifies the source directory.
- -r: Recursively includes files in subdirectories.
- -d docs: Outputs the generated documentation to the docs folder.

### 3. View Documentation:
Open the index.html file inside the docs folder in your browser to view the generated documentation.

## Directory Structure
```
kitra-api/
│
├── src/
│   ├── config/
│   │   └── database.js                   # Database connection configuration
│   │
│   ├── controllers/
│   │   └── treasureController.js   # Business logic for handling treasure-related requests
│   │   └── authController.js       # Business logic for handling auth-related requests
│   │
│   ├── routes/
│   │   └── treasureRoutes.js       # Express routes for treasures
│   │   └── authRoutes.js           # Express routes for auth
│   │
│   ├── models/
│   │   └── treasure.js          # Treasure model
│   │   └── users.js             # Users model
│   │
│   ├── middlewares/
│   │   └── errorHandler.js         # Logic to handle errors
│   │   └── validationMiddleware.js # Validation logic
│   │   └── authenticateTOken.js    # Logic to verify the token
│   │
│   ├── services/
│   │   └── treasureService.js      # Service layer for interacting with the models
│   │   └── authService.js          # Service layer for interacting with the models
│   │
│   ├── tests/
│   │   └── treasure.test.js        # Jest unit tests
│   │   └── users.test.js           # Jest unit tests
│   │
│   ├── app.js                      # Express app initialization
│   ├── server.js                   # running server based from defined port
│   └── swagger.js                  # Swagger setup
│
├── .env                            # Environment variables
├── .gitignore                      # Ignored files
├── app.yaml                        # App Engine configuration for production deployment
├── dispatch.yaml                   # App Engine production routes for each service
├── package.json                    # Node.js dependencies and scripts
└── README.md                       # Project documentation
```