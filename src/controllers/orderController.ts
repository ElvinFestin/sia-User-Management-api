import { Request, Response } from "express";
import { Order } from "../models/order";
import { IOrder } from "../interfaces/orderInterfaces";
import mongoose from "mongoose";
import { validateOrder } from "../validations/orderValidation";
import bcrypt from "bcrypt";

export class OrderController {
  // Create a new user
  // Handles POST requests to create a new user in the database
  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming user data against schema rules
      const { error, value: payload } = validateOrder(req.body);
      if (error) {
        // Return early if validation fails, sending back specific error messages
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Generate a unique salt and hash the user's password for security
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(payload.password, salt);

      // Prepare user data with a new MongoDB ID and the hashed password
      const orderData: IOrder = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
        password: hashedPassword,
      };

      // Create and save the new user to the database
      const order = new Order(orderData);
      const savedUser = await order.save();

      // Return the newly created user with 201 Created status
      res.status(201).json(OrderController);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all users
  // Handles GET requests to retrieve all users from the database
  public async getAllOrder(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all users from database, excluding sensitive password field
      const order: IOrder[] = await Order.find().select("-password");
      res.json(order);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get user by ID
  // Handles GET requests to retrieve a specific user by their ID
  public async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find user by ID, excluding password field
      const user: IOrder | null = await Order.findById(req.params.id).select(
        "-password"
      );

      // Return 404 if user doesn't exist
      if (!Order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      // Return the found user
      res.json(Order);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update user
  // Handles PUT/PATCH requests to update an existing user
  public async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated user data
      const { error, value: payload } = validateOrder(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Hash the new password if it's being updated
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(payload.password, salt);

      // Prepare update data with hashed password
      const orderData: Partial<IOrder> = { ...payload, password: hashedPassword };

      // Update the user and get the updated document
      const user: IOrder | null = await Order.findByIdAndUpdate(
        req.params.id,
        orderData,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if user doesn't exist
      if (!Order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      // Remove password from response data for security
      //let withoutPassword = orderData.toJSON();
      //delete withoutPassword.password;

      // Return the updated user without password
      //res.json(withoutPassword);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete user
  // Handles DELETE requests to remove a user from the database
  public async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the user in one operation
      const user: IOrder | null = await Order.findByIdAndDelete(req.params.id);

      // Return 404 if user doesn't exist
      if (!user) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Order deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}