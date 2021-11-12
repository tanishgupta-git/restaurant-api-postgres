import express, { Router } from "express";
import { addToCart, cancelOrder, clearCart, getCart, getDishes,placeOrder, removeFromCart, searchDishes, updateItemQuantity } from "../controllers/user";

const router : Router = express.Router();

router.get('/dishes',getDishes);
router.get('/searchdishes',searchDishes);
router.put('/order',placeOrder);
router.post('/cancelorder',cancelOrder);
router.post('/cart',addToCart);
router.post('/updateitem',updateItemQuantity);
router.get('/cart',getCart);
router.delete('/cart',removeFromCart);
router.delete('/clearcart',clearCart);


export default router;