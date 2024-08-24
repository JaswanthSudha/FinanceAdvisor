import { Router } from 'express';
import {
	createMessage,
	getUserMessages,
	deleteMessages,
} from '../controllers/message.controller.js';
import { authUser } from '../middleware/auth.js';
const router = Router();
router.post('/message', authUser, createMessage);
router.get('/messages', authUser, getUserMessages);
router.delete('/messages', authUser, deleteMessages);
export default router;
