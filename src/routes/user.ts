import express from "express";
import { getDishes } from "../controllers/user";

const router = express.Router();

router.get('/getDishes',getDishes);

export default router;