import express from "express";
import { PermissionController } from "../controllers/permissionController";
import { authMiddleware } from "../middleware/authMiddleware";

// Initialize express Router
const router = express.Router();
// Create an instance of PermissionController to handle route logic
const permissionsController = new PermissionController();

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Permission management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       properties:
 *         token_id:
 *           type: string
 *           example: "12345-abcdef"
 *           description: Token ID - unique identifier for a permission
 *         manager:
 *           type: boolean
 *           example: true
 *           description: Indicates if the user has manager permissions
 *         casher:
 *           type: boolean
 *           example: false
 *           description: Indicates if the user has casher permissions
 *         guess_user:
 *           type: boolean
 *           example: true
 *           description: Indicates if the user is a guest
 *       required:
 *         - token_id
 *         - manager
 *         - casher
 *         - guess_user
 *
 *     PermissionResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "645d5e5fda23c8f9b4d8f9a7"
 *         token_id:
 *           type: string
 *           example: "12345-abcdef"
 *         manager:
 *           type: boolean
 *           example: true
 *         casher:
 *           type: boolean
 *           example: false
 *         guess_user:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/permissions:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Permission'
 *     responses:
 *       201:
 *         description: Permission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionResponse'
 *       400:
 *         description: Validation error
 *       409:
 *         description: Permission already exists
 * 
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
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
 *         description: List of permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PermissionResponse'
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
 * /api/permissions/{id}:
 *   get:
 *     summary: Get permission by ID
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionResponse'
 *       404:
 *         description: Permission not found
 *   put:
 *     summary: Update permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token_id:
 *                 type: string
 *               manager:
 *                 type: boolean
 *               casher:
 *                 type: boolean
 *               guess_user:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionResponse'
 *       404:
 *         description: Permission not found
 *   delete:
 *     summary: Delete permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     responses:
 *       204:
 *         description: Permission deleted successfully
 *       404:
 *         description: Permission not found
 */

// Permission Routes:

// POST /api/permissions - Create a new permission
router.post("/api/permissions", authMiddleware, permissionsController.createPermission);

// GET /api/permissions - Retrieve all permissions
router.get("/api/permissions", authMiddleware, permissionsController.getAllPermissions);

// GET /api/permissions/:id - Retrieve a specific permission by ID
router.get("/api/permissions/:id", authMiddleware, permissionsController.getPermissionById);

// PUT /api/permissions/:id - Update a specific permission
router.put("/api/permissions/:id", authMiddleware, permissionsController.updatePermission);

// DELETE /api/permissions/:id - Delete a specific permission
router.delete("/api/permissions/:id", authMiddleware, permissionsController.deletePermission);

// Export the router for use in the main application
export default router;
