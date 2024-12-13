import { Request, Response } from "express";
import { User } from "../models/user";
import { IUser } from "../interfaces/userInterfaces";
import mongoose from "mongoose";
import { validateUser } from "../validations/userValidation";

export class UserManagementController {
  // Create a new user
  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming user data
      const { error, value: payload } = validateUser(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare user data
      const userData: IUser = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Save user to database
      const user = new User(userData);
      const savedUser = await user.save();

      // Return the created user
      res.status(201).json(savedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all users
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: IUser[] = await User.find();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get user by ID
  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser | null = await User.findById(req.params.id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update user
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateUser(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      const user: IUser | null = await User.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true }
      );

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete user
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user: IUser | null = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json({ message: "User deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
