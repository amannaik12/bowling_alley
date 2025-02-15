import express from 'express';
import { create_user, login } from "../controllers/userauth.js";

const authRouter = express();

authRouter.post('/', create_user);

authRouter.post('/login', login);

export default authRouter;