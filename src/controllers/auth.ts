import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';


export const login = (req:Request,res:Response,next:NextFunction) => {
    poolDB.query('INSERT INTO users (name, email) VALUES ($1, $2)', ['maggi', 'maggi@gmail.com'], (error, result) => {
        if (error) {
          throw error
        }
        res.status(201).send(`User added with ID`)
      })
    res.send("Hii i am in login");
} 