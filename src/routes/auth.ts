import express from "express";
import { userLogin,userSignup,addAdmin,adminLogin } from '../controllers/auth';

const router = express.Router();

router.post('/user/signup',userSignup);
router.post('/user/login',userLogin);
router.get('/admin/signup',addAdmin);
router.get('/admin/login',adminLogin);

export default router;