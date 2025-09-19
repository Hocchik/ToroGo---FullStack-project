import express from 'express';
import { requestTrip, acceptTrip, completeTrip, getUserTrips } from '../controllers/trip.controller.js';

const router = express.Router();

router.post('/accept', acceptTrip);
router.post('/complete', completeTrip);
router.get('/history', getUserTrips);
router.post('/request', requestTrip);

export default router;