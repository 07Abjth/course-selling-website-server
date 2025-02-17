 import express from 'express';
import { registerMentor, loginMentor } from '../../controllers/mentorControllers.js';

const router = express.Router();

// Route to register a new mentor
router.post('/register', registerMentor);

// Route for mentor login
router.post('/login', loginMentor);

export default router;
