import express from 'express';
import multer from 'multer';
import { importChatHistory } from '../controllers/chatController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// Set up file upload
const upload = multer({ storage: multer.memoryStorage() });

// Route to import chat history
router.post('/import', authenticate, upload.single('chatFile'), importChatHistory);

export default router;
