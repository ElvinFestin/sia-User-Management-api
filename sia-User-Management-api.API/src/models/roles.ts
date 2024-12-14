// src/models/Roles.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IRole extends Document {
    roleID: string;
    roleType: 'manager' | 'cashier' | 'guest_user';
}

const RoleSchema = new Schema<IRole>({
    roleID: { type: String, required: true, unique: true },
    roleType: { type: String, enum: ['manager', 'cashier', 'guess_user'], required: true },
});

export const Role = mongoose.model<IRole>('Role', RoleSchema);
