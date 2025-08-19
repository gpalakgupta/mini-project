import express from "express";
import { getAllDoctors, getDoctorById,addDoctor } from "../controllers/doctorController.js";

const router = express.Router();

router.get("/getalldoctors", getAllDoctors);
router.get("/getdoctors/:id", getDoctorById);
router.post("/adddoctor", addDoctor);


export default router;

