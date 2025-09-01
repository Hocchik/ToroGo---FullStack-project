import express from 'express';
import { createUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/', createUser);

// Otras rutas para autenticación, obtener usuarios, etc.

export default router;