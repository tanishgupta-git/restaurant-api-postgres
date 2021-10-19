import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';

export const getDishes = async (req:Request,res:Response,next:NextFunction) => {
   try 
     {
     const page : number = Number(req.params.page) || 0;
     let respon = await poolDB.query(`SELECT * FROM dishes OFFSET ${page * 5} LIMIT 5`)
     res.json(respon.rows);
     }
     catch(e) {
       res.send("Error in getting dishes")
       console.log(e);
     }
   
} 