import jwt from 'jsonwebtoken'

import { AppError, catchAsyncError } from '../../utils/error.handler.js'
import userModel from '../user/models/user.model.js'
import childModel from '../user/models/child.model.js'

export const authenticate = (req, res, next) => {
	const token = req.header('token')

	if (!token || !token.startsWith('Bearer'))
		throw new AppError('Unauthorized', 401)

	const bearerToken = token.split(' ')[1]

	try {
		const decoded = jwt.verify(bearerToken, process.env.SECRET)
		req.user = decoded
		next()
	} catch (error) {
		throw new AppError(error.message, 498)
	}
}

export const authorize = (role) => {
	return (req, res, next) => {
		if (role !== req.user.role) throw new AppError('Forbidden', 403)
		next()
	}
}

export const assertUniqueEmail = catchAsyncError(async (req, res, next) => {
	const { email } = req.body
	const user = await userModel.findOne({ email })
	if (user) throw new AppError('This email is already taken', 400)
	next()
})
export const assertUniqueEmailchild = catchAsyncError(async (req, res, next) => {
	const { email } = req.body
	const user = await childModel.findOne({ email })
	if (user) throw new AppError('This email is already taken', 400)
	next()
})
export const assertParentExist = catchAsyncError(async (req, res, next) => {
	const { parent_id } = req.body
	const user = await userModel.findOne({ _id:parent_id })
	if (!user) throw new AppError('Parent ID doesnt Exist ', 400)
	next()
})
