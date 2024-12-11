import { Request, Response } from "express";
import { Transaction } from "../models/transaction";
import { ITransaction } from "../interfaces/transactionInterfaces";
import mongoose from "mongoose";
import { validateTransaction } from "../validations/transactionValidation";

export class TransactionController {
  // Create a new transaction
  public async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      // Validate incoming transaction data
      const { error, value: payload } = validateTransaction(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err: { message: any }) => err.message) });
        return;
      }

      // Prepare transaction data with a new MongoDB ID
      const transactionData: ITransaction = {
        _id: new mongoose.Types.ObjectId(),
        ...payload,
      };

      // Create and save the new transaction
      const transaction = new Transaction(transactionData);
      const savedTransaction = await transaction.save();

      // Return the newly created transaction with 201 Created status
      res.status(201).json(savedTransaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all transactions
  public async getAllTransactions(req: Request, res: Response): Promise<void> {
    try {
      const transactions: ITransaction[] = await Transaction.find();
      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a transaction by ID
  public async getTransactionById(req: Request, res: Response): Promise<void> {
    try {
      const transaction: ITransaction | null = await Transaction.findById(req.params.id);

      if (!transaction) {
        res.status(404).json({ message: "Transaction not found" });
        return;
      }

      res.json(transaction);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update a transaction
  public async updateTransaction(req: Request, res: Response): Promise<void> {
    try {
      // Validate the updated transaction data
      const { error, value: payload } = validateTransaction(req.body);
      if (error) {
        res
          .status(400)
          .json({ message: error.details.map((err) => err.message) });
        return;
      }

      // Update the transaction and get the updated document
      const transaction: ITransaction | null = await Transaction.findByIdAndUpdate(
        req.params.id,
        payload,
        { new: true } // Returns the modified document
      );

      if (!transaction) {
        res.status(404).json({ message: "Transaction not found" });
        return;
      }

      res.json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete a transaction
  public async deleteTransaction(req: Request, res: Response): Promise<void> {
    try {
      const transaction: ITransaction | null = await Transaction.findByIdAndDelete(req.params.id);

      if (!transaction) {
        res.status(404).json({ message: "Transaction not found" });
        return;
      }

      res.json({ message: "Transaction deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}