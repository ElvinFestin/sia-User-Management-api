import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { JWT_SECRET } from "../config/config";
import { validateUser } from "../validations/userValidation";
import { IUser } from "../interfaces/userInterfaces";
import mongoose from "mongoose";

class AuthController {
 // User Registration Handler
 async register(req: Request, res: Response): Promise<void> {
 try {
 // Step 1: Validate user input data
 const { error, value: payload } = validateUser(req.body);
 if (error) {
 res.status(400).json({ message: error.details.map((err) => err.message) });
 return;
 }

const { email, password } = payload;
 console.log("Registration attempt for email:", email); // Debug log

// Step 2: Check for existing user
 const existingUser = await User.findOne({ email });
 console.log("Existing user:", existingUser); // Debug log
 if (existingUser) {
 res.status(400).json({ message: "User already exists" });
 return;
 }

// Step 3: Hash the password for security
 const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password, salt);

// Step 4: Prepare user data with MongoDB ID
 const userData: IUser = {
 _id: new mongoose. Types.ObjectId(),
 ... payload,
 password: hashedPassword,
 };

// Step 5: Create and save new user
 const newUser = new User(userData);
 const savedUser = await newUser.save();

// Step 6: Generate JWT token for immediate authentication
 const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET, {
 expiresIn: "10m",
 });

// Step 7: Send success response
 res.status(201).json({
 message: "User created successfully",
 token,
 user: {
 id: savedUser._id,
 email: savedUser.email,
 },
 });
 } catch (error) {
 console.error("Error during registration:", error); // Debug log
 res.status(500).json({ message: "Error during registration", error });
 }
 }

// User Login Handler
 async login(req: Request, res: Response): Promise<void> {
 try {
 // Step 1: Extract credentials from request
 const { email, password } = req.body;

// Step 2: Verify user exists
 const user = await User.findOne({ email });
 if (!user) {
 res.status(401).json({ message: "Invalid credentials" });
 return;
 }

// Step 3: Verify password
 const isPasswordValid = await bcrypt.compare(password, user.password);
 if (!isPasswordValid) {
 res.status(401).json({ message: "Invalid credentials" });
 return;
 }

// Step 4: Generate access token (short-lived)
 const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
 expiresIn: "5m",
 });

// Step 5: Generate refresh token (long-lived)
 const refreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
 expiresIn: "24h",
 });

// Step 6: Send success response
 res.json({
 message: "Login successful",
 accessToken,
 refreshToken,
 user: {
 id: user._id,
 email: user.email,
 },
 });
 } catch (error) {
 console.error("Error logging in:", error); // Debug log
 res.status(500).json({ message: "Error logging in", error });
 }
 }

// Refresh Token Handler
 async refreshToken(req: Request, res: Response): Promise<void> {
 try {
 const { refreshToken } = req.body;

if (!refreshToken) {
 res.status(401).json({ message: "Refresh token is required" });
 return;
 }

// Verify the refresh token
 const decoded = jwt.verify(refreshToken, JWT_SECRET) as {
 userId: string;
 };

// Find user
 const user = await User.findById(decoded.userId);
 if (!user) {
 res.status(404).json({ message: "User not found" });
 return;
 }

// Generate new access token
 const newAccessToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
 expiresIn: "5m",
 });

// Generate new refresh token
 const newRefreshToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
 expiresIn: "24h",
 });

res.json({
 accessToken: newAccessToken,
 refreshToken: newRefreshToken,
 });
 } catch (error) {
 if (error instanceof jwt. TokenExpiredError) {
 res.status(401).json({ message: "Refresh token has expired" });
 return;
 }
 if (error instanceof jwt. JsonWebTokenError) {
 res.status(401).json({ message: "Invalid refresh token" });
 return;
 }
 console.error("Error refreshing token:", error); // Debug log
 res.status(500).json({ message: "Error refreshing token", error });
 }
 }
}

export default new AuthController();