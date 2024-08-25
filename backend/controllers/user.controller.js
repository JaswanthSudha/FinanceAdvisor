import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
const generateAccessToken = (userId) => {
	return jwt.sign({ userId }, process.env.SECRET_KEY);
};
const registerUser = async (req, res) => {
	try {
		let { email, password } = req.body;
		if ([password, email].includes(undefined)) {
			return res.status(400).json({ message: 'Please fill in all fields' });
		}
		password = await bcrypt.hash(password, 10);
		console.log(password);
		const user = await User.create({ email, password });
		const token = generateAccessToken(user._id);

		if (!user) {
			return res.status(400).json({ message: 'User Not Created' });
		}
		res.status(201).json({ user, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: 'All Fields Are Required' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'User Not Found' });
		}
		const checkValidPassword = await bcrypt.compare(password, user.password);
		if (!checkValidPassword) {
			return res.status(400).json({ message: 'Invalid Credentials' });
		}
		const token = generateAccessToken(user._id);
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export { registerUser, loginUser };
