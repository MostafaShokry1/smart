import mongoose from 'mongoose'
const BleDeviceSchema = new mongoose.Schema({
  mac: String,
  device: String,
  date: { type: Date, default: Date.now }
},{timestamps:true});
  const BleDevice = mongoose.model('BleDevice', BleDeviceSchema);
  export default BleDevice