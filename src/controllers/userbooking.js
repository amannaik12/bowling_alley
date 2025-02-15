import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAvailableSlot(req, res) {
  try {
    const availableSlots = await prisma.slot.findMany({
      where: {
        status: 'false',  
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
  const { slotId } = req.body;  

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
  };

  export async function cancelBooking(req, res) {
    const { slotId } = req.body;
  
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
  
      // Check if the slot is already booked
      if (slot.status === 'false') {
        return res.status(400).json({ message: 'Slot is already available' });
      }
  
      // Update the slot status to 'false' (available again)
      const updatedSlot = await prisma.slot.update({
        where: { id: slotId },
        data: { status: 'false' },
      });
  
      return res.status(200).json({ message: 'Slot cancelled successfully', updatedSlot});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
}
