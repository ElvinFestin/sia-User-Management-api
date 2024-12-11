// src/models/Transaction.ts
import mongoose, { Document, Schema } from 'mongoose';

interface ITransaction extends Document {
    transactionId: string;
    productId: mongoose.Types.ObjectId;
    inventoryId: mongoose.Types.ObjectId;
    orderId: mongoose.Types.ObjectId;
    transactionType: 'purchase' | 'sale';
    transactionDate: Date;
    quantity: number;
    payment: number;
}

const TransactionSchema = new Schema<ITransaction>({
    transactionId: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    transactionType: { type: String, enum: ['purchase', 'sale'], required: true },
    transactionDate: { type: Date, default: Date.now },
    quantity: { type: Number, required: true, min: 1 },
    payment: { type: Number, required: true },
});

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);