const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shari Mohol API Documentation",
      version: "1.0.0",
      description: "API documentation for Shari Mohol eCommerce backend",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
    ],
  },
  apis: [
    path.join(__dirname, "../routes/**/*.js"), // route files
    path.join(__dirname, "../controllers/**/*.js"), // controller files (optional)
    path.join(__dirname, "../api.yaml"), // your YAML file
  ],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
