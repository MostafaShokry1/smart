import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import GpsData from "../models/Gps.model.js";
import { catchAsyncError } from "../../../utils/error.handler.js";

const port = new SerialPort({
  path: "COM5",
  baudRate: 9600,
  autoOpen: false,
});

port.open((err) => {
  if (err) {
    return console.error("Error opening port: ", err.message);
  }

  const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

  parser.on('data', async (data) => {
    // Assuming the data format is "Latitude: 30.599462, Longitude: 31.541019"
    const matches = data.trim().match(/Latitude: ([0-9.-]+), Longitude: ([0-9.-]+)/);
    
    if (matches && matches.length === 3) {
      const latitude = parseFloat(matches[1]);
      const longitude = parseFloat(matches[2]);

      // Check if latitude and longitude are valid numbers
      if (!isNaN(latitude) && !isNaN(longitude)) {
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        try {
          const gpsEntry = new GpsData({ latitude, longitude });
          await gpsEntry.save();
          console.log('GPS data saved successfully!');
        } catch (err) {
          console.error('Error saving GPS data:', err);
        }
      } else {
        console.error('Invalid GPS data received:', data);
      }
    } else {
      console.error('Data format does not match expected pattern:', data);
    }
  });
  port.on("open", () => {
    console.log("Serial Port Opened");
  });
  port.on("error", (err) => {
    console.error("Error: ", err.message);
  });
});

export const getlocation = catchAsyncError(async (req, res) => {
  const ChildLoc = await GpsData.find();
  if (!ChildLoc) throw new AppError("ChildLoc doesn't exist", 404);
  res.json({ ChildLoc });
});
export const deleteAllChildloc = catchAsyncError(async (req, res) => {
  const result = await GpsData.deleteMany({})
  if (!result || result.deletedCount === 0) {
    throw new AppError("No ChildMac records found to delete", 404);
  }
  res.json({ message: `Deleted ${result.deletedCount} ChildMac records` });
});
export const addlocation = catchAsyncError(async (req, res) => {
  const ChildLoc = await GpsData.create(req.body);
  if (!ChildLoc) throw new AppError("ChildLoc doesn't exist", 404);
  res.json({ ChildLoc });
});