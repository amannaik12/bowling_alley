import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAvailableSlot(req, res) {
  try {
    // Fetch only slots where the status is 'false' (available)
    const availableSlots = await prisma.slot.findMany({
      where: {
        status: 'false',  // Filter for available slots (status = false)
      },
    });
    return res.status(200).json(availableSlots);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// 1. Book a Slot - change the status to pending
export async function bookSlot(req, res) {
  const { slotId } = req.body;  // Get the slot ID from the request body

  if (!slotId) {
    return res.status(400).json({ message: 'Slot ID is required' });
  }

  try {
    // Find the slot by ID
    const slot = await prisma.slot.findUnique({
      where: { id: slotId },
    });

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    // Check if the slot is already booked or pending
    if (slot.status !== 'false') {
      return res.status(400).json({ message: 'Slot is already booked or pending' });
    }

    // Update the slot status to 'pending' (waiting for admin approval)
    const updatedSlot = await prisma.slot.update({
      where: { id: slotId },
      data: {
        status: 'pending',
      },
    });

    return res.status(200).json({ message: 'Slot booked successfully. Awaiting admin approval.', updatedSlot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

export async function getPendingSlots(req, res) {
  try {
    const pendingSlots = await prisma.slot.findMany({
      where: {
        status: 'pending',  // Fetch only pending slots
      },
    });

    return res.status(200).json(pendingSlots);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching pending slots', error: error.message });
  }
}

// 2. Admin Approve Booking - change the status to booked
export async function approveBooking(req, res) {
    const { slotId } = req.body; // Assuming the slot ID is sent in the request body
  
    if (!slotId) {
      return res.status(400).json({ message: 'Slot ID is required' });
    }
  
    try {
      // Find the slot by ID
      const slot = await prisma.slot.findUnique({
        where: { id: slotId },
      });
  
      if (!slot) {
        return res.status(404).json({ message: 'Slot not found' });
      }
  
      // Check if the slot is already confirmed or booked
      if (slot.status !== 'pending') {
        return res.status(400).json({ message: 'Slot is not in pending status' });
      }
  
      // Update the status to 'booked' (or 'true')
      const updatedSlot = await prisma.slot.update({
        where: { id: slotId },
        data: { status: 'true' }, // or 'booked' if you prefer
      });
  
      return res.status(200).json({
        message: 'Slot successfully approved',
        updatedSlot,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  export async function getSlotDetails(req, res) {
    const { slotId } = req.params; // Getting the slotId from the route parameters
  
    if (!slotId) {
      return res.status(400).json({ message: 'Slot ID is required' });
    }
  
    try {
      // Find the slot by its ID
      const slot = await prisma.slot.findUnique({
        where: { id: slotId },
      });
  
      if (!slot) {
        return res.status(404).json({ message: 'Slot not found' });
      }
  
      return res.status(200).json({
        message: 'Slot details fetched successfully',
        slot,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }