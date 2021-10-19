import express, { Router } from "express";
import { getDishes } from "../controllers/user";

const router : Router = express.Router();

router.get('/dishes',getDishes);

export default router;