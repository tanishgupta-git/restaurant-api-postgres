import express, { Router } from "express";
import { getDishes,placeOrder, searchDishes } from "../controllers/user";

const router : Router = express.Router();

router.get('/dishes',getDishes);
router.get('/searchdishes',searchDishes);
router.put('/order',placeOrder);

export default router;