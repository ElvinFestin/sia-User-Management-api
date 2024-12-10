import { Request, Response, NextFunction } from "express";

export function corsHandler(req: Request, res: Response, next: NextFunction) {
  // Allow requests from the origin specified in the request header
  const origin = req.header("origin");
  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  // Specify which headers are allowed in CORS requests
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Allow credentials to be sent with CORS requests (e.g., cookies)
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests (OPTIONS method)
  if (req.method === "OPTIONS") {
    // Specify which HTTP methods are allowed for CORS requests
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    // Respond to preflight request with 204 No Content status
    return res.sendStatus(204);
  }

  // Move to the next middleware in the chain
  next();
}