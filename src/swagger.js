const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 3000;
const API_ENDPOINT = process.env.API_ENDPOINT || `http://localhost:${PORT}/api`;

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

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],  // Ensure this path is correct
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerDocs };