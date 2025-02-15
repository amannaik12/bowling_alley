import express from 'express';
import { approveBooking, getPendingSlots } from '../controllers/adminbooking.js';

const router = express();

router.get('/pendingSlots', getPendingSlots);

router.patch('/approve', approveBooking);

export default router;