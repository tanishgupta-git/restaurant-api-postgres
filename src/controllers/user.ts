import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';

export const getDishes = async (req:Request,res:Response,next:NextFunction) => {
   try 
     {
     let respon = await poolDB.query('SELECT * FROM dishes')
     res.json(respon.rows);
     }
     catch(e) {
       res.send("Error in getting dishes")
       console.log(e);
     }
   
 } 