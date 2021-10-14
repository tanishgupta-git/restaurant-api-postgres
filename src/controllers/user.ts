import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';

export const getDishes = async (req:Request,res:Response,next:NextFunction) => {
    let respon; 
   try 
     {
     respon = await poolDB.query('SELECT * FROM dish')
     res.json(respon.rows);
     }
     catch(e) {
       res.send("Error in getting dishes")
       console.log(e);
     }
   
 } 