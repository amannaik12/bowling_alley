import express from 'express';
import { bookSlot, approveBooking, getAvailableSlot, getPendingSlots, getSlotDetails } from '../controllers/booking.js';

const router = express.Router();

router.get('/', getAvailableSlot);

// Route to book a slot (sets status to 'pending')
router.post('/book', bookSlot);

router.get('/pendingSlots', getPendingSlots);

// Route for admin to approve the booking (sets status to 'true')
router.patch('/approve', approveBooking);

router.get('/:slotId', getSlotDetails)

export default router;