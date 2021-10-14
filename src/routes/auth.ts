import express from "express";
import { userLogin } from '../controllers/auth';

const router = express.Router();

router.get('/user/login',userLogin);

export default router;