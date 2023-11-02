import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config(); // Load environment variables from .env
const SECRET_KEY = process.env.SECRET_KEY || "default-secret";

// Function to check if the Bearer Token is valid
export function isTokenValid(token: string): any {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);

    return decodedToken;
  } catch (error) {
    return null;
  }
}

// Middleware to handle token validation
export function tokenValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: "Token is missing" });
    return;
  }

  const tokenParts = token.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    res.status(401).json({ message: "Invalid token format" });
    return;
  }

  const tokenValue = tokenParts[1];

  const decodedToken = isTokenValid(tokenValue);

  if (!decodedToken) {
    res.status(401).json({ message: "Token is invalid or has expired" });
    return;
  }

  next();
}
