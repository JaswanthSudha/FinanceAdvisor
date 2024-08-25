import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true },
);
export const User = mongoose.model('User', userSchema);
