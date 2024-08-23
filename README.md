# Kitra API
This repository contains the Kitra Game API, which allows users to collect treasures based on geographical coordinates. The API is backed by a MySQL database that stores user information, treasure locations, and associated monetary values.


## Description
This API allows users to find treasure boxes within a specified distance and prize value using geographical coordinates.

## Endpoints

- **POST /api/auth/login**: generate autohrization token upon login and use it to /api/v2/treasures
- **GET /api/v2/treasures**: Find treasures within a distance or and prize value with authorization
- **GET /api/treasures**: Find treasures within a distance or and prize value.



## Prerequisites
Before you can run the application, make sure you have the following installed on your system:
- visit this readme File: https://github.com/wlabesamis/mysql-server/blob/main/README.md


## Setup API

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
5. Access Swagger docs at `/api-docs`.

## Testing

Run tests using Jest:
```bash
npm test
```

## Production API endpoint
- **POST https://kitra.wlabesamis.website/api/auth/login**: generate autohrization token upon login and use it to /api/v2/treasures
- **GET https://kitra.wlabesamis.website/api/v2/treasures**: Find treasures within a distance or and prize value with authorization
- **GET https://kitra.wlabesamis.website/api/treasures**: Find treasures within a distance or and prize value.

## Swagger UI/DOCS
https://kitra.wlabesamis.website/api-docs

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
│   │
│   ├── routes/
│   │   └── treasureRoutes.js       # Express routes for treasures
│   │
│   ├── models/
│   │   └── treasure.js             # Treasure model
│   │
│   ├── middlewares/
│   │   └── errorHandler.js         # Logic to handle errors
│   │   └── validationMiddleware.js # Validation logic
│   │
│   ├── services/
│   │   └── treasureService.js      # Service layer for interacting with the database
│   │
│   ├── tests/
│   │   └── treasure.test.js        # Jest unit tests
│   │
│   ├── app.js                      # Express app initialization
│   └── swagger.js                  # Swagger setup
|   └── server.js                   # running server from defined port
│
├── .env                            # Environment variables
├── .gitignore                      # Ignored files
├── package.json                    # Node.js dependencies and scripts
└── README.md                       # Project documentation
```