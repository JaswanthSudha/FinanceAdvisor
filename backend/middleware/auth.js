import jwt from 'jsonwebtoken';
const authUser = async (req, res, next) => {
	try {
		// console.log(req.header('Authorization'));
		const accessToken = req.header('Authorization').replace('Bearer ', '');
		// console.log(accessToken);
		if (!accessToken) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		const user = await jwt.verify(accessToken, process.env.SECRET_KEY);
		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		req.user = user;
		next();
	} catch (error) {
		console.log('error', error.message);
		return res.status(500).json({ messgae: 'Some Error Occured During Auth' });
	}
};
export { authUser };
