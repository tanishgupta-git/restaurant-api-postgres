import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';


export const login = (req:Request,res:Response,next:NextFunction) => {
    poolDB.query('SELECT * FROM resuser', (error, result) => {
        if (error) {
          throw error
        }
        console.log(result)
        res.status(201).json(result);
      })
  
} 