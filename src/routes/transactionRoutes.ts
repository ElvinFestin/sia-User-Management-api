import express from "express";
import { TransactionController } from "../controllers/transactionController";
import { authMiddleware } from "../middleware/authMiddleware";

// Initialize express Router
const router = express.Router();
// Create an instance of TransactionController to handle route logic
const transactionController = new TransactionController();

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Transaction management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TransactionItem:
 *       type: object
 *       properties:
 *         amount:
 *           type: number
 *           example: 100
 *         status:
 *           type: string
 *           example: "Completed"
 *         paymentMethod:
 *           type: string
 *           example: "Credit Card"
 *         userId:
 *           type: string
 *           example: "user123"
 *         description:
 *           type: string
 *           example: "Payment for services"
 *       required:
 *         - amount
 *         - status
 *         - paymentMethod
 *         - userId
 *
 *     TransactionResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "645d5e5fda23c8f9b4d8f9a7"
 *         amount:
 *           type: number
 *           example: 100
 *         status:
 *           type: string
 *           example: "Completed"
 *         paymentMethod:
 *           type: string
 *           example: "Credit Card"
 *         userId:
 *           type: string
 *           example: "user123"
 *         description:
 *           type: string
 *           example: "Payment for services"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/transaction:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionItem'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *   get:
 *     summary: Get all transactions
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TransactionResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 */

/**
 * @swagger
 * /api/transaction/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       404:
 *         description: Transaction not found
 *
 *   put:
 *     summary: Update transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TransactionResponse'
 *       404:
 *         description: Transaction not found
 *
 *   delete:
 *     summary: Delete transaction
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       204:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 */

// Transaction Routes:

// POST /api/transaction - Create a new transaction
router.post("/api/transaction", authMiddleware, transactionController.createTransaction);

// GET /api/transaction - Retrieve all transactions
router.get("/api/transaction", authMiddleware, transactionController.getAllTransactions);

// GET /api/transaction/:id - Retrieve a specific transaction by ID
router.get("/api/transaction/:id", authMiddleware, transactionController.getTransactionById);

// PUT /api/transaction/:id - Update a specific transaction
router.put("/api/transaction/:id", authMiddleware, transactionController.updateTransaction);

// DELETE /api/transaction/:id - Delete a specific transaction
router.delete("/api/transaction/:id", authMiddleware, transactionController.deleteTransaction);

// Export the router for use in the main application
export default router;
