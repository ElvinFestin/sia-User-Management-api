import { Document } from "mongoose";

// Define the Permission interface
export interface IPermission extends Document {
  // Unique token ID for identifying the permission
  token_id: string;
  // Boolean indicating if the user has manager permissions
  manager: boolean;
  // Boolean indicating if the user has casher permissions
  casher: boolean;
  // Boolean indicating if the user is a guest
  guess_user: boolean;
}
