import { Doctor } from '../models/Doctor.js';
import {User} from '../models/User.js';




// register doctor
export const registerDoctor = async (req, res) => {
    const { name, email, password, specialization, experience } = req.body;

    const newUser = new User({
        name,
        email,
        password,
        role: 'doctor'
    });

    await newUser.save();

    const newDoctor = new Doctor({
        user: newUser._id,
        specialization,
        experience
    });

    await newDoctor.save();

    res.status(201).json({ user: newUser, doctor: newDoctor });
};


// login doctor
export const loginDoctor = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, role: 'doctor' });
    if (!user) {
        return res.status(404).json({ message: 'Doctor not found' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.generateToken();
    res.status(200).json({ token });
};


// get all doctor

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().populate('user', 'name email');
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// 


// add new doctor
export const addDoctor = async (req, res) => {
    const { name, specialization, experience } = req.body;

    const newDoctor = new Doctor({
        name,
        specialization,
        experience
    });

    await newDoctor.save();

    res.status(201).json(newDoctor);
};


// 