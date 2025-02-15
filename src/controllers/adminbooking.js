import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


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

export async function approveBooking(req, res) {
    const { slotId } = req.body; // Assuming the slot ID is sent in the request body
  
    if (!slotId) {
      return res.status(400).json({ message: 'Slot ID is required' });
    }
  
    try {
      const slot = await prisma.slot.findUnique({
        where: { id: slotId },
      });
  
      if (!slot) {
        return res.status(404).json({ message: 'Slot not found' });
      }
  
      if (slot.status !== 'pending') {
        return res.status(400).json({ message: 'Slot is not in pending status' });
      }
  
      const updatedSlot = await prisma.slot.update({
        where: { id: slotId },
        data: { status: 'true' }, 
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

  