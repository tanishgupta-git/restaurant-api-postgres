import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';
import CustomError from '../customTypes/errorType';

// function for getting all the dishes
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

// function for searching the dishes by name
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
     const error = new CustomError(500,'Error in getting dishes.');
     return next(error); 
    }
  
}

// function for getting the items in cart
export const getCart = async (req:Request,res:Response,next:NextFunction) => {

  try {

     const cart = await poolDB.query('SELECT * FROM carts WHERE user_id = $1',[req.userid]);
     const cartItemsIdsRow = await poolDB.query('SELECT * FROM cartitems WHERE cart_id = $1',[cart.rows[0].id]);
     let dishes = [];
     for (let i = 0; i < cartItemsIdsRow.rows.length ; i++){
        const dishDetail = await poolDB.query('SELECT * FROM dishes WHERE id = $1',[cartItemsIdsRow.rows[i].dish_id]);
        dishes.push({...dishDetail.rows[0],quantity:cartItemsIdsRow.rows[i].quantity}); 
     }

     res.json({
       dishes : dishes
     });
    
  } catch (e){
    const error = new CustomError(500,'error in adding item to cart.');
    return next(error); 
  }

}

// function for adding items to the cart
export const addToCart = async (req:Request,res:Response,next:NextFunction) => {

  if (!req.userid) {
    const error = new CustomError(401,'Please log in to add item to cart');
    return next(error); 
  }
  try {

     const cart = await poolDB.query('SELECT * FROM carts WHERE user_id = $1',[req.userid]);
     const orderDish:string = req.body.dish; 
     const quantityDish:number = req.body.quantity;
     // inserting the data of different dishes in an order
     await poolDB.query('INSERT INTO cartitems(id,cart_id,dish_id,quantity) VALUES (uuid_generate_v4(),$1,$2,$3)',[cart.rows[0].id,orderDish,quantityDish]);

     res.json({
      'message' : 'Added To Cart' 
     });
    
  } catch (e){
    const error = new CustomError(500,'error in adding item to cart.');
    return next(error); 
  }

}


// function for updating the quantity of dish
export const updateItemQuantity = async (req:Request,res:Response,next:NextFunction) => {

  try {

     const cart = await poolDB.query('SELECT * FROM carts WHERE user_id = $1',[req.userid]);
     const orderDish:string = req.body.dish; 
     const quantity:number = req.body.quantity;
    // removing the item from cartitems table
    await poolDB.query('UPDATE cartitems SET quantity = $3 WHERE cart_id = $1 AND dish_id = $2',[cart.rows[0].id,orderDish,quantity]);

     res.json({
      'message' : 'Update the quantity of dish' 
     });
    
  } catch (e){
    const error = new CustomError(500,'error in updating the quantity of item.');
    return next(error); 
  }

}

// function for removing the item in cart
export const removeFromCart = async (req:Request,res:Response,next:NextFunction) => {

  try {

    const cart = await poolDB.query('SELECT * FROM carts WHERE user_id = $1',[req.userid]);
    const orderDish:string = req.body.dish; 
    // removing the item from cartitems table
    await poolDB.query('DELETE FROM cartitems WHERE cart_id = $1 AND dish_id = $2',[cart.rows[0].id,orderDish]);

    res.json({
     'message' : 'Removed item from cart' 
    });
    
  } catch {
    const error = new CustomError(500,'error in clearing the cart.');
    return next(error); 
  }

}


// function for clearing the cart
export const clearCart = async (req:Request,res:Response,next:NextFunction) => {

  try {

     const cart = await poolDB.query('SELECT * FROM carts WHERE user_id = $1',[req.userid]);

     // removing all the items that are present in cart
     await poolDB.query('DELETE FROM cartitems WHERE cart_id = $1',[cart.rows[0].id]);

     res.json({
      'message' : 'Your cart is empty' 
     });
    
  } catch {
    const error = new CustomError(500,'error in clearing the cart.');
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
       const values = [req.userid,req.body.totalprice,false];
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

// function for cancelling the order
export const cancelOrder = async (req:Request,res:Response,next:NextFunction) => {
  try {
    // deleting the order by id
     await poolDB.query('DELETE FROM orders WHERE id = $1',[req.body.orderid]);

     res.json({
      'message' : `${req.body.orderid} is deleted.`
   });
    
  } catch {
    const error = new CustomError(500,'error in placing order.');
    return next(error); 
  }

}