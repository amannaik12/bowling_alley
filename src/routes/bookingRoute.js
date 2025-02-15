import express from 'express';
import { getAvailableSlot, bookSlot } from '../controllers/booking.js';

const router = express();

router.get('/', getAvailableSlot);// Get all slots (User/Admin)
router.post('/book', bookSlot);// Book a slot (User)

export default router;