import express from "express";
import { RolesController } from "../controllers/rolesControllers";
import { authMiddleware } from "../middleware/authMiddleware";

// Initialize express Router
const router = express.Router();
// Create an instance of RolesController to handle route logic
const roleController = new RolesController();

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Role management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Admin"
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           example: ["create", "read", "update", "delete"]
 *       required:
 *         - name
 *         - permissions
 *
 *     RoleResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "645d5e5fda23c8f9b4d8f9a7"
 *         name:
 *           type: string
 *           example: "Admin"
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           example: ["create", "read", "update", "delete"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
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
 *       409:
 *         description: Role already exists
 *   get:
 *     summary: Get all roles
 *     tags: [Role]
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
 *         description: List of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RoleResponse'
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
 * /api/roles/{id}:
 *   get:
 *     summary: Get role by ID
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *   put:
 *     summary: Update role
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *   delete:
 *     summary: Delete role
 *     tags: [Role]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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

// Role Routes:

// POST /api/roles - Create a new role
router.post("/api/roles", authMiddleware, roleController.createRole);

// GET /api/roles - Retrieve all roles
router.get("/api/roles", authMiddleware, roleController.getAllRoles);

// GET /api/roles/:id - Retrieve a specific role by ID
router.get("/api/roles/:id", authMiddleware, roleController.getRoleById);

// PUT /api/roles/:id - Update a specific role
router.put("/api/roles/:id", authMiddleware, roleController.updateRole);

// DELETE /api/roles/:id - Delete a specific role
router.delete("/api/roles/:id", authMiddleware, roleController.deleteRole);

// Export the router for use in the main application
export default router;
