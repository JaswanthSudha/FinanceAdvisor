import mongoose from 'mongoose';
const Schema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		text: {
			type: String,
			required: true,
		},
		isUser: {
			type: Boolean,
			required: true,
		},
	},
	{ timestamps: true },
);
export const MessageModel = mongoose.model('MessageSchema', Schema);
