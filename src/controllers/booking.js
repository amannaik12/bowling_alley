import { PrismaClient } from '@prisma/client';

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

    // Check if the slot is already booked
    if (slot.status === 'true') {
      return res.status(400).json({ message: 'Slot is already booked' });
    }

    // Update the slot status to 'true' (booked)
    const updatedSlot = await prisma.slot.update({
      where: { id: slotId },
      data: {
        status: 'true',  // Mark as booked
      },
    });

    return res.status(200).json({ message: 'Slot booked successfully', updatedSlot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}