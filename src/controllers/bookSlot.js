import { PrismaClient } from "@prisma/client";
import bcrypt, { compare } from "bcrypt";
import validator from "validator";

const prisma = new PrismaClient();

export async function create_slot(req, res) {
  const {laneid, phone, nop, starttime, endtime, tid} = req.body;

  if (!nop || !phone ) {
    return res.status(400).json({ error: "All fields are required" });
  }

   if (!validator.isMobilePhone(phone)) {
           return res.status(400).json({ error: "Invalid phone number" });
       }

    try {
        const bookstat = await prisma.timeSlot.updateMany({
            where: {
                laneid: laneid,
                id: tid,
                starttime: starttime,
                endtime: endtime
                
            },
            data: {
                isBooked: pending
              },
        })

        console.log(bookstat);

        return res.status(201).json({ message: "Request sent successfully"});  
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
    finally{
        await prisma.$disconnect();
    }



}