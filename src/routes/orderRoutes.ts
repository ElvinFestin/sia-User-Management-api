import express from "express";
import { OrderController } from "../controllers/orderController";
import { authMiddleware } from "../middleware/authMiddleware";

// Initialize express Router
const router = express.Router();
// Create an instance of OrderController to handle route logic
const orderController = new OrderController();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           example: "645d5e5fda23c8f9b4d8f9a7"
 *         quantity:
 *           type: integer
 *           example: 2
 *         status:
 *           type: string
 *           example: "pending"
 *       required:
 *         - productId
 *         - quantity
 *
 *     OrderResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "645d5e5fda23c8f9b4d8f9a7"
 *         productId:
 *           type: string
 *           example: "645d5e5fda23c8f9b4d8f9a7"
 *         quantity:
 *           type: integer
 *           example: 2
 *         status:
 *           type: string
 *           example: "completed"
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       400:
 *         description: Validation error
 *       409:
 *         description: Order already exists
 * 
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
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
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/OrderResponse'
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
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       404:
 *         description: Order not found
 *   put:
 *     summary: Update order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       404:
 *         description: Order not found
 *   delete:
 *     summary: Delete order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       204:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */

// Order Routes:

// POST /api/orders - Creates a new order
router.post("/api/orders", authMiddleware, orderController.createOrder);

// GET /api/orders/:id
// Retrieves a specific order by their ID
// :id - MongoDB ObjectId of the order
router.get("/api/orders/:id", authMiddleware, orderController.getAllOrder);

// GET /api/orders/:id - Retrieves a specific order by ID
router.get("/api/orders/:id", authMiddleware, orderController.getOrderById);

// PUT /api/orders/:id - Updates an order
router.put("/api/orders/:id", authMiddleware, orderController.updateOrder);

// DELETE /api/orders/:id - Deletes an order
router.delete("/api/orders/:id", authMiddleware, orderController.deleteOrder);

// Export the router for use in the main application
export default router;
