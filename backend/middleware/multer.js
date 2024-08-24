import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './controllers');
	},
	filename: (req, file, cb) => {
		cb(null, `file${path.extname(file.originalname)}`);
	},
});
const upload = multer({ storage });
export default upload;
