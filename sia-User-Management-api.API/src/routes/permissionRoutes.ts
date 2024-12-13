import express from "express";
import { PermissionController } from "../controllers/permissionController";
import { authMiddleware } from "../middleware/authMiddleware";

// Initialize express Router
const router = express.Router();
const permissionsController = new PermissionController();

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Permission Management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - action
 *         - resource
 *         - is_active
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the permission
 *         name:
 *           type: string
 *           description: Name of the permission
 *         action:
 *           type: string
 *           description: The action associated with the permission
 *         resource:
 *           type: string
 *           description: The resource associated with the permission
 *         is_active:
 *           type: boolean
 *           description: Indicates if the permission is active
 *     PermissionResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the permission
 *         name:
 *           type: string
 *           description: Name of the permission
 *         action:
 *           type: string
 *           description: The action associated with the permission
 *         resource:
 *           type: string
 *           description: The resource associated with the permission
 *         is_active:
 *           type: boolean
 *           description: Indicates if the permission is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the permission was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the permission was last updated
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 description: The field that caused the validation error
 *               message:
 *                 type: string
 *                 description: Details about the validation error
 */

/**
 * @swagger
 * /api/permissions:
 *   post:
 *     summary: Add a new permission
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PermissionResponse'
 *
 * /api/permissions/{permission_id}:
 *   get:
 *     summary: Get permission by ID
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permission_id
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
 *
 *   put:
 *     summary: Update permission details
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permission_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Permission'
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PermissionResponse'
 *       404:
 *         description: Permission not found
 *
 *   delete:
 *     summary: Delete permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: permission_id
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

// Define Routes
router.post("/api/permissions", authMiddleware, permissionsController.createPermission);
router.get("/api/permissions", authMiddleware, permissionsController.getAllPermissions);
router.get("/api/permissions/:permission_id", authMiddleware, permissionsController.getPermissionById);
router.put("/api/permissions/:permission_id", authMiddleware, permissionsController.updatePermission);
router.delete("/api/permissions/:permission_id", authMiddleware, permissionsController.deletePermission);

export default router;
