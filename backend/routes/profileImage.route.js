import { Router } from 'express';
import { uploadImage } from '../controllers/profileImage.controller.js';
import upload from '../middleware/multer2.js';
import { authUser } from '../middleware/auth.js';
const router = Router();
router
	.route('/profileImage')
	.post(upload.single('profile'), authUser, uploadImage);
export default router;
