import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';


export const userLogin = async (req:Request,res:Response,next:NextFunction) => {
   let respon; 
  try 
    {
    respon = await poolDB.query('SELECT * FROM resuser')
    res.json(respon.rows);
    }
    catch(e) {
      res.send("Error in getting users")
      console.log(e);
    }
  
} 