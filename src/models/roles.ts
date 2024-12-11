import mongoose, { Schema } from "mongoose";
import { IRoles } from "../interfaces/rolesInterfaces";

// Define the schema for the Roles model
// Schema specifies the structure and validation rules for Roles documents in MongoDB
export const rolesSchema = new Schema(
  {
    // Role ID field - primary key, must be unique, required
    role_id: { type: String, required: true, unique: true },
    // Manager field - Boolean value indicating if the role has manager permissions
    manager: { type: Boolean, required: true },
    // Casher field - Boolean value indicating if the role has casher permissions
    casher: { type: Boolean, required: true },
    // Guest User field - Boolean value indicating if the role is a guest user
    guess_user: { type: Boolean, required: true },
  },
  // Enable automatic timestamp fields (createdAt and updatedAt)
  { timestamps: true }
);

// Create and export the Roles model
export const Roles = mongoose.model<IRoles>("Roles", rolesSchema);
