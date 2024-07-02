import { AppError, catchAsyncError } from "../../../utils/error.handler.js";
import pusher from "../../../utils/pusher.js";
import BleDevice from "../models/Child.mac.model.js";
let sucessnoti;
const sendNotification = (mac, action) => {
  const message = {
    title: "Student Bus Entry/Exit",
    body: `Student with MAC address (${mac}) has ${action} the bus.`,
  };

  pusher
    .trigger("mac_updates", "student-action", message)
    .then(() => {
      sucessnoti = "Notification sent successfully";
    })
    .catch((error) => {
      throw new AppError("Error sending notification:", 404);
    });
};
export const addchildMac = catchAsyncError(async (req, res) => {
  const { mac } = req.body;
  const macId = await BleDevice.findOne({ mac });
  if (macId) throw new AppError("MAc Already Exits", 404);
  const data = await BleDevice.create(req.body);
  if (!data) throw new AppError("Error storing data", 400);
  sendNotification(mac, "Enter");
  res
    .status(201)
    .json({ message: "Data received and stored", Notification: sucessnoti });
});
export const getChildMac = catchAsyncError(async (req, res) => {
  const ChildMac = await BleDevice.find();
  if (!ChildMac) throw new AppError("ChildMac doesn't exist", 404);
  res.json({ ChildMac });
});
export const deleteAllChildMac = catchAsyncError(async (req, res) => {
  const result = await BleDevice.deleteMany({}); // Deletes all documents from BleDevice collection

  if (!result || result.deletedCount === 0) {
    throw new AppError("No ChildMac records found to delete", 404);
  }
  res.json({ message: `Deleted ${result.deletedCount} ChildMac records` });
});
