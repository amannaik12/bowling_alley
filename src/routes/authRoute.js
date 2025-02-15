import express from 'express';
import { create_user, login, adminLogin, createAdmin } from "../controllers/auth.js";

const authRouter = express();

authRouter.post('/', create_user);

authRouter.post('/login', login);

authRouter.post('/admin', createAdmin);

authRouter.post('/adminLogin', adminLogin);


export default authRouter;