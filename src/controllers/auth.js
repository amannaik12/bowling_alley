import { PrismaClient } from "@prisma/client";
import bcrypt, { compare } from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function create_user (req, res) {
  const {email, phone, name, password} = req.body;

  if(!email || !phone || !name || !password){
      return res.status(400).json({error: "All fields are required"});
  }

  if(!validator.isEmail(email)){
      return res.status(400).json({error: "Invalid email"});
  }

  if(phone.length < 10){
      return res.status(400).json({error: "Invalid phone number"})
  }

  if(password.length < 6){
      return res.status(400).json({error: "Password must be at least 6 characters"});
  }

  const hashedPassword = await bcrypt.hash(password,10);
  try{
      const user = await prisma.user.create({
          data: {
              email,
              phone,
              name,
              password: hashedPassword
          }
      })

      console.log(user);

      return res.status(201).json({message: "User created successfully", user});

  }catch(error){
      console.log(error);
      return res.status(500).json({error: "Internal server error"});
}
};

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Ensure JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT_SECRET is not defined' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({ message: 'Login successful', token });

  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', error: error.message });
  }
}