import express, { Router } from "express";
import { userLogin,userSignup,adminLogin } from '../controllers/auth';

const router : Router = express.Router();

router.post('/user/signup',userSignup);
router.post('/user/login',userLogin);
router.post('/admin/login',adminLogin);

export default router;