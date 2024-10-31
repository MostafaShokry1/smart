import mongoose from 'mongoose'

const childSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			minLength: 3,
			maxLength: 500,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			trim: true,
			required: true,
		},
		role: {
			type: String,
			enum: ['USER', 'ADMIN','CHILD'],
			default: 'CHILD',
		},
    address: {
      type: String,
			required: true,
    },
    phone_Number: {
      type: String,
			trim: true,
			required: true,
    },
    gender:{
      type: String,
			enum: ['MALE', 'FEMALE'],
      required: true,

    },
		isEmailVerified:{
			type:Boolean,
			default:false,
	
		},
		blocked: {
			type: Boolean,
			default: false,
		},
    parent_id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
      required: true,
    },
    cover_image: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'image',
			required:true,
		},
		mac_adress:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'BleDevice',
		},
		location:{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'GpsData',
		},
		grade:{
			type: String,
			trim: true,
			required: true,
		}

	},
	{ timestamps: true }
)

childSchema.pre(/find/, function (next) {
	this.populate('parent_id')
	next()
})
childSchema.pre(/find/, function (next) {
	this.populate('cover_image',['path'])
	next()
})

childSchema.pre(/delete/i, async function (next) {
	const toBeDeleted = await childModel.findOne(this._conditions)
	if (!toBeDeleted) return next()
	await mongoose
		.model('image')
		.findByIdAndDelete(toBeDeleted.cover_image)


	next()
})

childSchema.pre(/update/i, async function (next) {
	if (!this._update.cover_image) return next()
	const toBeUpdated = await childModel.findOne(this._conditions)
	if (!toBeUpdated) return next()

	await mongoose
		.model('image')
		.findByIdAndDelete(toBeUpdated.cover_image)
	next()
})

const childModel = mongoose.model('child', childSchema)

export default childModel
