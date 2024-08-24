const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 3000;
const API_ENDPOINT = process.env.API_ENDPOINT || `http://localhost:${PORT}/api`;

/**
 * Swagger configuration definition.
 * @type {object}
 * @property {string} openapi - OpenAPI version.
 * @property {object} info - Information about the API.
 * @property {string} info.title - Title of the API.
 * @property {string} info.version - Version of the API.
 * @property {string} info.description - Description of the API.
 * @property {object[]} servers - List of server URLs.
 * @property {object} servers.url - Base URL for the API.
 * @property {object} components - Components of the API.
 * @property {object} components.securitySchemes - Security schemes used in the API.
 * @property {object} components.securitySchemes.bearerAuth - Bearer authentication scheme.
 * @property {string} components.securitySchemes.bearerAuth.type - Type of security scheme.
 * @property {string} components.securitySchemes.bearerAuth.scheme - Scheme used in the security scheme.
 * @property {string} components.securitySchemes.bearerAuth.bearerFormat - Format of the bearer token.
 * @property {string} components.securitySchemes.bearerAuth.description - Description of the security scheme.
 * @property {object[]} security - Security requirements for the API.
 * @property {object} security.bearerAuth - Security requirement for bearer authentication.
 */
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Kitra API',
    version: '1.0.0',
    description: 'API for Kitra treasure hunting game',
  },
  servers: [
    {
      url: API_ENDPOINT,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token here',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

/**
 * Options for configuring Swagger JSDoc.
 * @type {object}
 * @property {object} swaggerDefinition - Swagger definition object.
 * @property {string[]} apis - List of file paths to API documentation comments.
 */
const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],  // Ensure this path is correct
};

/**
 * Swagger documentation object.
 * @type {object}
 */
const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };