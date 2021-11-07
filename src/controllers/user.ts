import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';
import CustomError from '../customTypes/errorType';

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
     const total = await poolDB.query('SELECT count(*) FROM dishes');
     res.json({
       data : respon.rows,
       total : total.rows
     });
     }
     catch(e) {
      const error = new CustomError(500,'Error in getting dishes.');
      return next(error); 
     }
   
}

export const searchDishes = async (req:Request,res:Response,next:NextFunction) => {
  try 
    {
   
    const page : number = Number(req.query.page) || 0;
    const searchQuery:string = req.query.name?.toString() || '';
    const query:string = `SELECT * FROM dishes WHERE name ILIKE $1 OFFSET ${page * 5} LIMIT 5`; 
    let respon = await poolDB.query(query,['%' + searchQuery + '%'])
    const total = await poolDB.query('SELECT count(*) FROM dishes');
    res.json({
      data : respon.rows,
      total : total.rows
    });
    }
    catch(e) {
    console.log(e);
     const error = new CustomError(500,'Error in getting dishes.');
     return next(error); 
    }
  
}

// funnction  for adding order by user
export const placeOrder = async (req:Request,res:Response,next:NextFunction) => {
    if (!req.userid) {
      const error = new CustomError(401,'Please log in to place an order');
      return next(error); 
    }
    try {
       const values = [req.body.userid,req.body.totalprice,false];
       const orderdishes : string[] = req.body.dishes; 
       let order = await poolDB.query('INSERT INTO orders(id,user_id,totalprice,completed) VALUES (uuid_generate_v4(),$1,$2,$3) RETURNING("id")',values)
       // inserting the data of different dishes in an order
       for (let i = 0; i < orderdishes.length; i++ ) {
         await poolDB.query('INSERT INTO orderdishes(id,order_id,dish_id) VALUES (uuid_generate_v4(),$1,$2)',[order.rows[0].id,orderdishes[i]]); 
       }
       res.json({
        'message' : `${order.rows[0].id} of Rs${req.body.totalprice} is Placed.`
     });
      
    } catch {
      const error = new CustomError(500,'error in placing order.');
      return next(error); 
    }

}