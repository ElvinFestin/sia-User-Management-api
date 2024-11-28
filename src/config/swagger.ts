// Import the swagger-jsdoc library which helps generate OpenAPI/Swagger documentation
import swaggerJsdoc from "swagger-jsdoc";

// Define Swagger configuration options
const options = {
  definition: {
    // Specify OpenAPI version being used
    openapi: "3.0.0",

    // Define API metadata
    info: {
      title: "User Management API", // Name of your API
      version: "1.0.0", // API version
      description: "API documentation for Web API 101", // Brief description
      contact: {
        name: "Elvin Festin", // Contact person
        email: "elvinfestin@gmail.com", // Contact email
      },
    },

    // Define server environments where the API can be accessed
    servers: [
      {
        url: "http://localhost:3000", // Local development server
        description: "Development server",
      },
      {
        url: "https://sia-project-name.onrender.com", // Production server
        description: "Production server",
      },
    ],

    // Define security schemes for API authentication
    components: {
      securitySchemes: {
        // Configure JWT Bearer token authentication
        bearerAuth: {
          type: "http", // HTTP authentication type
          scheme: "bearer", // Bearer authentication scheme
          bearerFormat: "JWT", // Token format (JWT)
        },
      },
    },

    // Apply bearer authentication globally to all endpoints
    security: [
      {
        bearerAuth: [], // Empty array means no specific scopes required
      },
    ],
  },

  // Specify where to find API documentation in your codebase
  apis: ["./src/**/*.ts"], // Will look for JSDoc comments in all .ts files
};

// Generate and export the Swagger specification
export const specs = swaggerJsdoc(options);