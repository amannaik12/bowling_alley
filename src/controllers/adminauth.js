import { PrismaClient } from "@prisma/client";
import bcrypt, { compare } from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function createAdmin(req, res) {
    const { email, password, name } = req.body;
  
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Email, password, and name are required' });
    }
  
    try {
      // Check if the admin already exists
      const existingAdmin = await prisma.admin.findUnique({
        where: { email },
      });
  
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin with this email already exists' });
      }
  
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new admin user
      const admin = await prisma.admin.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });
  
      return res.status(201).json({ message: 'Admin created successfully', admin });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating admin', error: error.message });
    }
  }
  
  // Admin login
  export async function adminLogin(req, res) {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const admin = await prisma.admin.findUnique({
        where: { email },
      });
  
      if (!email || !(await bcrypt.compare(password, admin.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      return res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };
  
  export async function resetBookedSlots(req, res) {
    try {
      await prisma.slot.updateMany({
        where: { status: { in: ["true", "pending"] } }, // Select slots with these statuses
        data: { status: "false" }, // Set them to "AVAILABLE"
      });
  
      return res.status(200).json({ message: "All slots have been reset" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error in resetting slots", error: error.message });
    }
  }