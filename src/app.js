const express = require('express');
const treasureRoutes = require('./routes/treasureRoutes');
const userRoutes = require('./routes/authRoutes');

const { swaggerUi, swaggerDocs } = require('./swagger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

/**
 * Express application setup.
 * 
 * This setup:
 * - Initializes the Express application.
 * - Configures middleware for JSON request parsing.
 * - Sets up Swagger UI for API documentation.
 * - Registers route handlers for the `/api` endpoint for both treasures and user authentication.
 * - Adds a global error handler middleware to catch and handle errors.
 * 
 * @module app
 */

/**
 * Middleware for parsing JSON request bodies.
 * 
 * @function
 * @name jsonParser
 * @memberof module:app
 */
app.use(express.json());

/**
 * Swagger UI setup for API documentation.
 * 
 * Serves the Swagger UI at the `/api-docs` endpoint.
 * The Swagger documentation is generated and provided by the `swaggerDocs` object.
 * 
 * @function
 * @name setupSwagger
 * @memberof module:app
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * Route handlers for treasure-related endpoints.
 * 
 * Registers route handlers for endpoints related to treasures under the `/api` base path.
 * 
 * @function
 * @name treasureRoutes
 * @memberof module:app
 */
app.use('/api', treasureRoutes);

/**
 * Route handlers for user authentication endpoints.
 * 
 * Registers route handlers for user authentication endpoints under the `/api` base path.
 * 
 * @function
 * @name userRoutes
 * @memberof module:app
 */
app.use('/api', userRoutes);

/**
 * Global error handler middleware.
 * 
 * Catches and handles errors that occur during request processing.
 * This middleware should be added after all other route handlers.
 * 
 * @function
 * @name errorHandler
 * @memberof module:app
 */
app.use(errorHandler);

module.exports = app;