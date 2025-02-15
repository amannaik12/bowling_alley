import express from 'express';
import { adminLogin, createAdmin, resetBookedSlots } from "../controllers/adminauth.js";

const authRouter = express();

authRouter.post('/admin', createAdmin);

authRouter.post('/adminLogin', adminLogin);

authRouter.post('/reset', resetBookedSlots);

export default authRouter;