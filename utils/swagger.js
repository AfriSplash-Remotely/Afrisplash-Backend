require('dotenv').config({ path: '../.env/config.env' });
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const PORT = process.env.PORT;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Afrisplash API',
      version: '1.0.0',
      description: 'API documentation for Afrisplash backend APIs',
      contact: {
        name: 'Afrisplash',
        url: 'https://github.com/AfriSplash-Remotely/Afrisplash-Backend',
        email: ''
      }
    },
    servers: [
      {
        // url: `http://localhost:${PORT}/api/v1`,
        url: `http://localhost:7000/api/v1`,
        description: 'Development server'
      },
      {
        url: 'https://',
        description: 'Production server'
      }
    ]
  },
  apis: ['./swagger/*']
};

const swaggerSpecs = swaggerJsDoc(options);

function swaggerDocs(app, port) {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

  app.get('docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpecs);
  });
  console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
  return;
}

module.exports = swaggerDocs;
