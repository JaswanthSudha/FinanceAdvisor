import { Router } from 'express';
import { geminiAdvice } from '../controllers/gemini.controller.js';
const router = Router();
router.route('/getAdvice').post(geminiAdvice);
export default router;
