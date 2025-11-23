import express from "express";
import {
  register,
  login,
  listusers,
  currentUser,
  getAllUsers,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes (require JWT)
router.get("/users", authenticate, listusers); // List users (Admin only, with filters)
router.get("/users/all", authenticate, getAllUsers); // Get all users (Admin only)
router.get("/currentuser", authenticate, currentUser); // Get single user details (self or Admin)

export default router;
