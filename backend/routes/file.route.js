import { Router } from 'express';
import fileUploader from '../middleware/multer.js';
import { handleFileUpload } from '../controllers/file.controller.js';

const router = Router();
router.route('/upload').post(fileUploader.single('file'), handleFileUpload);
export default router;
