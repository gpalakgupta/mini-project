import { Doctor } from '../models/Doctor.js';
import { User } from '../models/User.js';

// add doctor
export const addDoctor = async (req, res) => {
    try {
        const { name,  email, specialization, hospital, location , password } = req.body;
        if(!email || !name || !specialization || !hospital || !location) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }

        const doctorExists = await Doctor.findOne({ email });
        if (doctorExists) {
            return res.status(400).json({ message: 'Doctor already exists' });
        }

        const doctor = await Doctor.create({ name, email , specialization, hospital, location ,  password });
        res.status(201).json(doctor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get doctor by ID
export const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).select('-password   ');
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


