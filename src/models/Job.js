import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    job: { type: String, required: true, unique: true },
    shipment: { type: String, required: true },
    status: { type: String, required: true },
    latitude: { type: String },
    longitude: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Job || mongoose.model("Job", JobSchema);