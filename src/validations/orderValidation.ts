import Joi from "joi"; // Import Joi validation library

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *           example: user@example.com
 *         password:
 *           type: string
 *           format: password
 *           minLength: 8
 *           description: User's password (min 8 chars, must contain uppercase, lowercase, number, special char)
 *           example: "Pass123!@#"
 *         firstName:
 *           type: string
 *           maxLength: 50
 *           description: User's first name
 *           example: "John"
 *         lastName:
 *           type: string
 *           maxLength: 50
 *           description: User's last name
 *           example: "Doe"
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: User's unique identifier
 *         email:
 *           type: string
 *           format: email
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               path:
 *                 type: array
 *                 items:
 *                   type: string
 */

// Define a validation schema for user data
const orderValidationSchema = Joi.object({
  // Email validation
  // - Must be a valid email format
  // - Required field
  email: Joi.string().email().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),

  // Password validation
  // - Minimum 8 characters
  // - Must contain: uppercase, lowercase, number, special character
  // - Required field
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      "any.required": "Password is required",
    }),

  // First name validation
  // - Maximum 50 characters
  // - Required field
  firstName: Joi.string().max(50).messages({
    "string.max": "First name cannot exceed 50 characters",
    "any.required": "First name is required",
  }),

  // Last name validation
  // - Maximum 50 characters
  // - Required field
  lastName: Joi.string().max(50).messages({
    "string.max": "Last name cannot exceed 50 characters",
    "any.required": "Last name is required",
  }),
});

// Helper function to validate user data
// - Takes user data as input
// - Returns validation result with all errors (abortEarly: false)
// - Type 'any' is used for userData as it's raw input that needs validation
export const validateOrder = (orderData: any) => {
  return orderValidationSchema.validate(orderData, { abortEarly: false });
};