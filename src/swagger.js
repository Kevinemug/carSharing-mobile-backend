const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car API',
      version: '1.0.0',
      description: 'A simple Express Car API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  // Path to the API docs
  apis: ['./routes/*.js'], // This could also be an array of file paths
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
