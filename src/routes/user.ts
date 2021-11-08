import express, { Router } from "express";
import { addToCart, clearCart, getCart, getDishes,placeOrder, removeFromCart, searchDishes } from "../controllers/user";

const router : Router = express.Router();

router.get('/dishes',getDishes);
router.get('/searchdishes',searchDishes);
router.put('/order',placeOrder);
router.post('/cart',addToCart);
router.get('/cart',getCart);
router.delete('/cart',removeFromCart);
router.delete('/clearcart',clearCart);


export default router;