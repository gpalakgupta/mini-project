import express from "express";
import { createAppointment ,getAllAppointments,getAllDoctorAppointments,getAppointmentById,updateAppointment,deleteAppointment} from "../controllers/appoinmentController.js";
import { authMiddleware } from "../middleware/authmiddleware.js";

const router = express.Router();
router.post("/create", authMiddleware, createAppointment);
router.get("/all", authMiddleware, getAllAppointments);
router.get("/doctor", authMiddleware, getAllDoctorAppointments);
router.get("/:id", authMiddleware, getAppointmentById);
router.put("/:id", authMiddleware, updateAppointment);
router.delete("/:id", authMiddleware, deleteAppointment);

export default router;