import express, { Router } from "express";
import { newAdmin,addDish,deleteDish,updateDish,addCatgory,deleteCategory } from '../controllers/admin'

const router : Router = express.Router();

router.put('/newadmin',newAdmin);
router.put('/dish',addDish);
router.post('/dish/:id',updateDish);
router.delete('/dish/:dishname',deleteDish);
router.put('/category',addCatgory);
router.delete('/category/:categoryname',deleteCategory);

export default router;