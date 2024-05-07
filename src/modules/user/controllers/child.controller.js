import { ApiFeatures } from "../../../utils/apiFeatures.js";
import { AppError, catchAsyncError } from "../../../utils/error.handler.js";
import childModel from "../models/child.model.js";
import bcrypt from "bcrypt";
export const getAllChildWithParent = catchAsyncError(async (req, res) => {
  const apiFeatures = new ApiFeatures(childModel.find(), req.query).paginate(
    10
  );
  const children = await apiFeatures.query;
  res.json({ children });
});
export const addchild = catchAsyncError(async (req, res) => {
  const {
    name,
    email,
    password,
    parent_id,
    gender,
    phone_Number,
    address,
    grade,
  } = req.body;
  const hashed = bcrypt.hashSync(password, +process.env.SALT);
  console.log(req.image);

  await childModel.create({
    grade,
    name,
    email,
    password: hashed,
    address,
    gender,
    parent_id,
    phone_Number,
    cover_image: req.image,
  });

  res.status(201).json({ message: "added  successfully" });
});
export const getchild = catchAsyncError(async (req, res) => {
  const child = await childModel.find({ parent_id: req.user.id });
  if (!child) throw new AppError("child doesn't exist", 404);
  res.json({ child });
});

export const updateChild = catchAsyncError(async (req, res) => {
  const { name, password, parent_id, gender, phone_Number, address, grade } =
    req.body;
  const hashed = bcrypt.hashSync(password, +process.env.SALT);
  const child = await childModel.findByIdAndUpdate(
    req.params.id,
    {
      grade,
      name,
      password: hashed,
      address,
      gender,
      parent_id,
      phone_Number,
      cover_image: req.image,
    },
    {
      new: true,
    }
  );
  if (!child) throw new AppError("child doesn't exist", 404);
  res.json({ child });
});
export const deleteChild = catchAsyncError(async (req, res) => {
  const child = await childModel.findByIdAndDelete(req.params.id, {
    new: true,
  });
  if (!child) throw new AppError("child doesn't exist", 404);
  res.json({ child });
});
