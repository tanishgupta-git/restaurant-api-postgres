import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';
import bcrypt from 'bcryptjs';
import CustomError from '../customTypes/errorType';

// function for adding admin
export const addAdmin = async (req:Request,res:Response,next:NextFunction) => {
    if(!req.isAdmin) {
     const error = new CustomError(401,'You are not authorizd as a admin');
     return next(error);  
    }
    try {
     const password = req.body.password;
     const hashedPw = await bcrypt.hash(password, 12);
     const values = [req.body.name,req.body.username,req.body.email,hashedPw]
 
     const user = await poolDB.query('INSERT INTO admins(id,name,username,email,password) VALUES (uuid_generate_v4(),$1,$2,$3,$4) RETURNING("id")',values);
     res.json({
        'message' : `admin added with ${user.rows[0].id}`
     });
    } catch (e) {
     const error = new CustomError(500,'Either the admin already exist or try again later');
     return next(error); 
    }
 }