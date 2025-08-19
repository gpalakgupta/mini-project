import { Appointment } from "../models/Appoinment.js";
import { User } from "../models/User.js";

// create appoinment

export const createAppointment = async (req, res) => {
    try {
        const { doctorId,patientId, date, time } = req.body;
        if (!doctorId || !patientId || !date || !time) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        if (req.user.role !== "PATIENT") {
            return res.status(403).json({ message: "Only patients can book appointments" });
        }
        const appointment = await Appointment.create({
            doctor: doctorId,
            patient: patientId,
            date,
            time
        });
        res.status(201).json(appointment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

// get all appointments of a patient
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.user._id });
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};


// get all appointments of a doctor
export const getAllDoctorAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctor: req.user._id });
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error" });
    }
};