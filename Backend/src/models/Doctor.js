import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        ref: "User",
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
    location: {
        type: String,
        required: true
    },
    availableSlots: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Doctor = mongoose.model("Doctor", doctorSchema);