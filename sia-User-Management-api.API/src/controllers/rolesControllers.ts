import { Request, Response } from "express";
import { Role } from "../models/roles";
import { IRoles } from "../interfaces/rolesInterfaces";
import mongoose from "mongoose";
import { validateRoles } from "../validations/rolesValidation";

export class RolesController {
  // Create a new role
  // Handles POST requests to create a new role in the database
  public async createRole(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming role data against schema rules
      const { error, value: payload } = validateRoles(req.body);
      if (error) {
        // Return early if validation fails, sending back specific error messages
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare role data with a new MongoDB ID
      const roleData: IRoles = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new role to the database
      const role = new Role(roleData);
      const savedRole = await role.save();

      // Return the newly created role with 201 Created status
      res.status(201).json(savedRole);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all roles
  // Handles GET requests to retrieve all roles from the database
  public async getAllRoles(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all roles from the database
      const roles: IRoles[] = await Role.find();
      res.json(roles);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get role by ID
  // Handles GET requests to retrieve a specific role by its ID
  public async getRoleById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find role by ID
      const role: IRoles | null = await Role.findById(req.params.id);

      // Return 404 if role doesn't exist
      if (!role) {
        res.status(404).json({ message: "Role not found" });
        return;
      }

      // Return the found role
      res.json(role);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update role
  // Handles PUT/PATCH requests to update an existing role
  public async updateRole(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated role data
      const { error, value: payload } = validateRoles(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Prepare update data
      const roleData: Partial<IRoles> = { ...payload };

      // Update the role and get the updated document
      const role: IRoles | null = await Role.findByIdAndUpdate(req.params.id, roleData, { new: true });

      // Return 404 if role doesn't exist
      if (!role) {
        res.status(404).json({ message: "Role not found" });
        return;
      }

      // Return the updated role
      res.json(role);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete role
  // Handles DELETE requests to remove a role from the database
  public async deleteRole(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the role in one operation
      const role: IRoles | null = await Role.findByIdAndDelete(req.params.id);

      // Return 404 if role doesn't exist
      if (!role) {
        res.status(404).json({ message: "Role not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Role deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
