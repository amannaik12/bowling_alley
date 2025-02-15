import express from 'express';
import { bookSlot,  getAvailableSlot, getSlotDetails, cancelBooking } from '../controllers/userbooking.js';

const router = express.Router();

router.get('/', getAvailableSlot);

router.post('/book', bookSlot);

router.get('/:slotId', getSlotDetails);

router.post('/cancel/:slotId', cancelBooking);

export default router;