import { Router } from "express";
import { create_slot } from "../controllers/bookSlot.js";

const bookrouter = Router();        // Create a new router

bookrouter.post("/",(req, res) => {
    create_slot(req, res);
});

export default bookrouter;