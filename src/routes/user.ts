import express, { Router } from "express";
import { getDishes,placeOrder } from "../controllers/user";

const router : Router = express.Router();

router.get('/dishes',getDishes);
router.put('/order',placeOrder);

export default router;