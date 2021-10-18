import express, { Router } from "express";
import { userLogin,userSignup,addAdmin,adminLogin } from '../controllers/auth';

const router : Router = express.Router();

router.post('/user/signup',userSignup);
router.post('/user/login',userLogin);
router.post('/admin/signup',addAdmin);
router.post('/admin/login',adminLogin);

export default router;