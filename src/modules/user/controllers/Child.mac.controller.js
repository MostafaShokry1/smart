import { AppError, catchAsyncError } from "../../../utils/error.handler.js";
import BleDevice from "../models/Child.mac.model.js";

export const addchildMac = catchAsyncError(async (req, res) => {
  const data=await BleDevice.create(req.body);
    if(!data) throw new AppError("Error storing data", 400)
  res.status(201).json({ message: "Data received and stored" });

});
export const getChildMac = catchAsyncError(async (req, res) => {
  const ChildMac = await BleDevice.find();
	if(!ChildMac) throw new AppError("ChildMac doesn't exist", 404)
  res.json({ ChildMac });
});
