import { Router } from "express";
import { create_user } from "../controllers/auth.js";

const router = Router();        // Create a new router

router.post("/",(req, res) => {
    create_user(req, res);
});

export default router;