import { MessageModel } from '../models/message.model.js';
const createMessage = async (req, res) => {
	const { isUser, text } = req.body;
	if (text == '') {
		return res.status(400).json({ message: 'All fields are required' });
	}
	const message = new MessageModel({
		user: req.user.userId,
		text,
		isUser,
	});

	const mes = await message.save();
	return res.status(201).json({ mes, message: 'Message created' });
};
const getUserMessages = async (req, res) => {
	try {
		const messages = await MessageModel.find({ user: req.user.userId });
		if (!messages) {
			return res.status(400).json({ message: 'No messages found' });
		}
		return res.status(200).json({ messages });
	} catch (error) {
		return res.status(500).json({ error });
	}
};
const deleteMessages = async (req, res) => {
	try {
		const deltedMessage = await MessageModel.deleteMany({});
		res.status(200).json({ message: 'Deleted Message' });
	} catch (error) {
		return res.status(500).json({ message: 'Unable to delete Messages' });
	}
};
export { createMessage, getUserMessages, deleteMessages };
