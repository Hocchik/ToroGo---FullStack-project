import express from 'express';
import { registerUser, loginUser, selectActiveRole } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and return roles or token
 * @access Public
 */
router.post('/login', loginUser);

/**
 * @route POST /api/auth/select-role
 * @desc Select active role and receive new token
 * @access Protected
 */
router.post('/select-role', authenticate, selectActiveRole);

/**
 * @route POST /api/auth/register
 * @desc Register new user with role
 * @access Public
 */
router.post('/register', registerUser);


export default router;