import mongoose from "mongoose";
const gpsSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now }
});

const GpsData = mongoose.model('GpsData', gpsSchema);
export default GpsData