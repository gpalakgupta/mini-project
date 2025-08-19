import express from "express";
import { createAppointment } from "../controllers/appoinmentController.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();
router.post("/create", authMiddleware, createAppointment);

export default router;