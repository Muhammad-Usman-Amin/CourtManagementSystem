import mongoose from "mongoose";

const courtSchema = new mongoose.Schema({
  courtCode: { type: String, required: true, unique: true },
  courtName: { type: String, required: true },
  location: String,
  level: String, // e.g., "District", "Session", etc.
  district: String,
  zone: String,
  judge: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  caseCount: { type: Number, default: 0 },
  lastDataUpload: Date,
});

const Court = mongoose.model("Court", courtSchema, "courts");

export default Court;
