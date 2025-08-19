import express from "express";
import { getAllDoctors, getDoctorById,addDoctor ,updateDoctor} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/getalldoctors", getAllDoctors);
router.get("/getdoctors/:id", getDoctorById);
router.post("/adddoctor", addDoctor);
router.put("/updatedoctor/:id", updateDoctor);


export default router;

