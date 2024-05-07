import bcrypt from "bcrypt";
import { ApiFeatures } from "../../../utils/apiFeatures.js";
import { AppError, catchAsyncError } from "../../../utils/error.handler.js";
import userModel from "../models/user.model.js";

export const getAllUsers = catchAsyncError(async (req, res) => {
  const apiFeatures = new ApiFeatures(userModel.find(), req.query).paginate(10);
  const users = await apiFeatures.query;
  res.json({ users });
});

export const getUser = catchAsyncError(async (req, res) => {
  const user = await userModel.findById(req.user.id);
	if(!user) throw new AppError("user doesn't exist", 404)
  res.json({ user });
});

export const updateUser = catchAsyncError(async (req, res) => {
	const { name, password } =
	req.body;
  const hashed = bcrypt.hashSync(password, +process.env.SALT);
  const user = await userModel.findByIdAndUpdate(
    req.user.id,
    { name, password: hashed },
    {
      new: true,
    }
  );
	if(!user) throw new AppError("user doesn't exist", 404)
  res.json({ user });
});
export const updateUserById = catchAsyncError(async (req, res) => {
	const { name, password } =
	req.body;
  const hashed = bcrypt.hashSync(password, +process.env.SALT);
  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    { name, password: hashed },
    {
      new: true,
    }
  );
	if(!user) throw new AppError("user doesn't exist", 404)
  res.json({ user });
});
export const deleteUser = catchAsyncError(async (req, res) => {
  const user = await userModel.findByIdAndDelete(req.params.id, {
    new: true,
  });
	if(!user) throw new AppError("user doesn't exist", 404)
  res.json({ user });
});
