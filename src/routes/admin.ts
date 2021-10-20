import express, { Router } from "express";
import { addAdmin } from '../controllers/admin'

const router : Router = express.Router();

router.post('/addnew',addAdmin);

export default router;