import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';

export const getDishes = async (req:Request,res:Response,next:NextFunction) => {
   try 
     {
    
     const page : number = Number(req.query.page) || 0;
     let query : string;
     if( req.query.sort){
      query = req.query.sort == 'LTH' ? `SELECT * FROM dishes ORDER BY price OFFSET ${page * 5} LIMIT 5`
         :`SELECT * FROM dishes ORDER BY price DESC OFFSET ${page * 5} LIMIT 5`;
     }else{
       query = `SELECT * FROM dishes OFFSET ${page * 5} LIMIT 5`;
     }
     let respon = await poolDB.query(query)
     res.json(respon.rows);
     }
     catch(e) {
       res.send("Error in getting dishes")
       console.log(e);
     }
   
} 