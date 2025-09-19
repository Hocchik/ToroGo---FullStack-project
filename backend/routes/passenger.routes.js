// routes/passengerRoutes.js
import express from 'express';
import { registerPassenger } from '../controllers/passengerController.js';

const router = express.Router();

router.post('/register', registerPassenger);

export default router;