import http from "http";
import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

// import './server';
// import bodyParser from 'body-parser';
// import cors from 'cors';



import "./config/logging";
import { DEVELOPMENT, mongo, server } from "./config/config";
import permissionRoutes from "./routes/permissionRoutes";
import rolesRoutes from "./routes/rolesRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";


import "reflect-metadata";

import { corsHandler } from "./middleware/corsHandler";
import { loggingHandler } from "./middleware/loggingHandler";
import { routeNotFound } from "./middleware/routeNotFound";
import { specs } from "./config/swagger";


export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
  logging.log("----------------------------------------");
  logging.log("Initializing API");
  logging.log("----------------------------------------");
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());

  logging.log("----------------------------------------");
  logging.log("Swagger UI");
  logging.log("----------------------------------------");
  application.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "Your API Documentation",
    })
  );

  logging.log("----------------------------------------");
  logging.log("Connect to Mongo");
  logging.log("----------------------------------------");
  try {
    const connection = await mongoose.connect(
      mongo.MONGO_CONNECTION,
      mongo.MONGO_OPTIONS
    );
    logging.log("----------------------------------------");
    logging.log("Connected to Mongo: ", connection.version);
    logging.log("----------------------------------------");
  } catch (error) {
    logging.log("----------------------------------------");
    logging.error(error);
    logging.error("Unable to connect to Mongo");
    logging.log("----------------------------------------");
  }

  logging.log("----------------------------------------");
  logging.log("Logging & Configuration");
  logging.log("----------------------------------------");
  application.use(loggingHandler);
  application.use(corsHandler);

  logging.log("----------------------------------------");
  logging.log("Define Controller Routing");
  logging.log("----------------------------------------");
  application.use(permissionRoutes);
  application.use(rolesRoutes);
  application.use(userRoutes);
  application.use(authRoutes);


  logging.log("----------------------------------------");
  logging.log("Define Routing Error");
  logging.log("----------------------------------------");
  application.use(routeNotFound);
  

  logging.log("----------------------------------------");
  logging.log("Starting Server");
  logging.log("----------------------------------------");
  httpServer = http.createServer(application);
  httpServer.listen(server.SERVER_PORT, () => {
    logging.log("----------------------------------------");
    logging.log(
      `Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`
    );
    logging.log("----------------------------------------");
  });
};

export const Shutdown = (callback: any) =>
  httpServer && httpServer.close(callback);

Main();