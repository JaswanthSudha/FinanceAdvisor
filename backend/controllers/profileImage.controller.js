import { User } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
const uploadImage = async (req, res) => {
	try {
		if (!req.file) {
			throw new Error('Image Not Uploaded');
		}
		const user = await User.findById(req.user.userId);
		const url = await uploadOnCloudinary(req.file?.path);
		if (!url) {
			throw new Error('Image Not Uploaded On Cloud');
		}
		user.image = url;
		await user.save();
		res.status(200).json({ message: 'Image Uploaded Successfully', url });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export { uploadImage };
