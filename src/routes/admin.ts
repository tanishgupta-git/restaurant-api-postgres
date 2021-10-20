import express, { Router } from "express";
import { newAdmin,addDish,deleteDish,updateDish } from '../controllers/admin'

const router : Router = express.Router();

router.post('/newadmin',newAdmin);
router.put('/dish',addDish);
router.post('/dish/:id',updateDish);
router.delete('/dish/:dishname',deleteDish);


export default router;