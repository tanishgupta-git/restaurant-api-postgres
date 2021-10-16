import express from "express";
import { userLogin,userSignup } from '../controllers/auth';

const router = express.Router();

router.get('/user/signup',userSignup);
router.get('/user/login',userLogin);

export default router;