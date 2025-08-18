import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    availableSlots: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Doctor = mongoose.model("Doctor", doctorSchema);