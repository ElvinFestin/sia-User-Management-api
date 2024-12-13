import express from "express";
import { RolesController } from "../controllers/rolesControllers";
import { authMiddleware } from "../middleware/authMiddleware";

// Initialize express Router
const router = express.Router();
const rolesController = new RolesController();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role Management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - role_id
 *         - manager
 *         - cashier
 *         - guess_user
 *       properties:
 *         role_id:
 *           type: string
 *           description: Unique identifier of the role
 *         manager:
 *           type: string
 *           description: Manager role description
 *         cashier:
 *           type: string
 *           description: Cashier role description
 *         guess_user:
 *           type: string
 *           description: Guest user role description
 *     RoleResponse:
 *       type: object
 *       properties:
 *         role_id:
 *           type: string
 *           description: Unique identifier of the role
 *         manager:
 *           type: string
 *           description: Manager role description
 *         cashier:
 *           type: string
 *           description: Casher role description
 *         guess_user:
 *           type: string
 *           description: Guest user role description
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the role was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the role was last updated
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
 * /api/roles:
 *   post:
 *     summary: Add a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoleResponse'
 *
 * /api/roles/{role_id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 *       404:
 *         description: Role not found
 *
 *   put:
 *     summary: Update role details
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoleResponse'
 *       404:
 *         description: Role not found
 *
 *   delete:
 *     summary: Delete role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: role_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       204:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 */

// Define Routes
router.post("/api/roles", authMiddleware, rolesController.createRole);
router.get("/api/roles", authMiddleware, rolesController.getAllRoles);
router.get("/api/roles/:role_id", authMiddleware, rolesController.getRoleById);
router.put("/api/roles/:role_id", authMiddleware, rolesController.updateRole);
router.delete("/api/roles/:role_id", authMiddleware, rolesController.deleteRole);

export default router;
