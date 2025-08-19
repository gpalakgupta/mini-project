import express from "express";
import { createAppointment ,getAllAppointments,getAllDoctorAppointments} from "../controllers/appoinmentController.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();
router.post("/create", authMiddleware, createAppointment);
router.get("/all", authMiddleware, getAllAppointments);
router.get("/doctor", authMiddleware, getAllDoctorAppointments);

export default router;