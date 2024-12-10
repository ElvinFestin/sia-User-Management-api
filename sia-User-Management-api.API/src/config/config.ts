import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";

// Add error checking for .env loading
const result = dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

if (result.error) {
  logging.log("----------------------------------------");
  logging.log("Error loading .env file:", result.error);
  logging.log("----------------------------------------");
  throw result.error;
}

// Environment flags
export const DEVELOPMENT = process.env.NODE_ENV === "development";
export const QA = process.env.NODE_ENV === "qa";
export const PRODUCTION = process.env.NODE_ENV === "production";

// MongoDB connection configuration
export const MONGO_DB = process.env.MONGO_DB;
export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
export const MONGO_URL = process.env.MONGO_URL;
export const MONGO_COLLECTION = process.env.MONGO_COLLECTION;
export const MONGO_OPTIONS: mongoose.ConnectOptions = {
  retryWrites: true,
  w: "majority",
  appName: MONGO_DB,
};

// Server configuration
export const SERVER_HOSTNAME = process.env.SERVER_HOST || "localhost";
export const SERVER_PORT = process.env.SERVER_PORT || 3000;

// JWT configuration
export const JWT_SECRET = process.env.JWT_SECRET || "";

// Grouped MongoDB configuration
export const mongo = {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_URL,
  MONGO_COLLECTION,
  MONGO_OPTIONS,
  MONGO_CONNECTION: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_COLLECTION}`,
};

// Grouped server configuration
export const server = {
  SERVER_HOSTNAME,
  SERVER_PORT,
};