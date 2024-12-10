import mongoose, { Schema } from "mongoose";
import { IPermission } from "../interfaces/permissionInterfaces";

// Define the schema for the Permission model
// Schema specifies the structure and validation rules for Permission documents in MongoDB
export const permissionSchema = new Schema(
  {
    // Token ID field - primary key, must be unique, required
    token_id: { type: String, required: true, unique: true },
    // Manager field - Boolean value indicating if the user has manager permissions
    manager: { type: Boolean, required: true },
    // Casher field - Boolean value indicating if the user has casher permissions
    casher: { type: Boolean, required: true },
    // Guest User field - Boolean value indicating if the user is a guest
    guess_user: { type: Boolean, required: true },
  },
  // Enable automatic timestamp fields (createdAt and updatedAt)
  { timestamps: true }
);

// Create and export the Permission model
export const Permission = mongoose.model<IPermission>("Permissions", permissionSchema);
