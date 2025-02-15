import express from 'express';
import { create_user, login, adminLogin, createAdmin, resetBookedSlots } from "../controllers/auth.js";

const authRouter = express();

authRouter.post('/', create_user);

authRouter.post('/login', login);

authRouter.post('/admin', createAdmin);

authRouter.post('/adminLogin', adminLogin);

authRouter.post('/reset', resetBookedSlots);


export default authRouter;