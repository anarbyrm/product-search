const swaggerUi = require("swagger-ui-express");
const yaml = require('yamljs');

const swaggerJsdoc = yaml.load('./doc/doc.yaml');

function swaggerDocs(app) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc));

}

module.exports = swaggerDocs;
