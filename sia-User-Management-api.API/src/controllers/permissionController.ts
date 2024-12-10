import { Request, Response } from "express";
import { Permission } from "../models/permission";
import { IPermission } from "../interfaces/permissionInterfaces";
import mongoose from "mongoose";
import { validatePermission } from "../validations/permissionValidation";

export class PermissionController {
  // Create a new permission
  // Handles POST requests to create a new permission in the database
  public async createPermission(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming permission data against schema rules
      const { error, value: payload } = validatePermission(req.body);
      if (error) {
        // Return early if validation fails, sending back specific error messages
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare permission data with a new MongoDB ID
      const permissionData: IPermission = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new permission to the database
      const permission = new Permission(permissionData);
      const savedPermission = await permission.save();

      // Return the newly created permission with 201 Created status
      res.status(201).json(savedPermission);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all permissions
  // Handles GET requests to retrieve all permissions from the database
  public async getAllPermissions(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all permissions from the database
      const permissions: IPermission[] = await Permission.find();
      res.json(permissions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get permission by ID
  // Handles GET requests to retrieve a specific permission by its ID
  public async getPermissionById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      // Attempt to find permission by ID
      const permission: IPermission | null = await Permission.findById(
        req.params.id
      );

      // Return 404 if permission doesn't exist
      if (!permission) {
        res.status(404).json({ message: "Permission not found" });
        return;
      }

      // Return the found permission
      res.json(permission);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update permission
  // Handles PUT/PATCH requests to update an existing permission
  public async updatePermission(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      // Validate the updated permission data
      const { error, value: payload } = validatePermission(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare update data
      const permissionData: Partial<IPermission> = { ...payload };

      // Update the permission and get the updated document
      const permission: IPermission | null = await Permission.findByIdAndUpdate(
        req.params.id,
        permissionData,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if permission doesn't exist
      if (!permission) {
        res.status(404).json({ message: "Permission not found" });
        return;
      }

      // Return the updated permission
      res.json(permission);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete permission
  // Handles DELETE requests to remove a permission from the database
  public async deletePermission(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      // Attempt to find and delete the permission in one operation
      const permission: IPermission | null = await Permission.findByIdAndDelete(
        req.params.id
      );

      // Return 404 if permission doesn't exist
      if (!permission) {
        res.status(404).json({ message: "Permission not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Permission deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
