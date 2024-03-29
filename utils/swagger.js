const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

dotenv.config({
  path: '../.env/config.env'
})
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
        url: 'https://afrisplash-473196ceadbb.herokuapp.com/api/v1',
        description: 'Production server'
      },
      {
        url: `http://localhost:5000/api/v1`,
        description: 'Development server'
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
  console.log(`Dev: Swagger Docs available at http://localhost:${port}/api-docs`);
  console.log('Prod: Swager Docs available at https://afrisplash-473196ceadbb.herokuapp.com/api-docs')
  return;
}

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description OpenAPI Documentation
 */
module.exports = swaggerDocs;