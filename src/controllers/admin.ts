import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';
import bcrypt from 'bcryptjs';
import CustomError from '../customTypes/errorType';

// function for adding admin
export const newAdmin = async (req:Request,res:Response,next:NextFunction) => {
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
        'message' : `${req.body.name} admin added with ${user.rows[0].id}`
     });
    } catch (e) {
     const error = new CustomError(500,'Either the admin already exist or try again later');
     return next(error); 
    }
 }


// function for adding dish
export const addDish = async (req:Request,res:Response,next:NextFunction) => {
   if(!req.isAdmin) {
      const error = new CustomError(401,'You are not authorizd as a admin');
      return next(error);  
     }
   try {
      const values = [req.body.name,req.body.category_id,req.body.imageUrl,req.body.price];
      const dish = await poolDB.query('INSERT INTO dishes(id,name,category_id,imageUrl,price) VALUES (uuid_generate_v4(),$1,$2,$3,$4) RETURNING("id")',values)
      res.json({
         'message' : `${req.body.name} dish added with ${dish.rows[0].id} id.`
      });

   } catch (e) {
     const error = new CustomError(500,'Error while adding the dish');
     return next(error); 
    
   }

}

// function for deleting dish
export const deleteDish = async (req:Request,res:Response,next:NextFunction) => {
   if(!req.isAdmin) {
      const error = new CustomError(401,'You are not authorizd as a admin');
      return next(error);  
     }
   try {
      
      await poolDB.query('DELETE FROM dishes WHERE name = $1',[req.params.dishname])
      res.json({
         'message' : `${req.params.dishname} dish deleted.`
      });
   } catch (e) {
     const error = new CustomError(500,'Error while deleting the dish');
     return next(error); 
   }

}

// function for updating the details of dish
export const updateDish = async (req:Request,res:Response,next:NextFunction) => {
   if(!req.isAdmin) {
      const error = new CustomError(401,'You are not authorizd as a admin');
      return next(error);  
     } 

     try {  
      const values = [req.body.name,req.body.category_id,req.body.imageUrl,req.body.price,req.params.id];
      await poolDB.query('UPDATE dishes SET name=$1, category_id=$2, imageUrl=$3, price=$4 WHERE id=$5',values)
      res.json({
         'message' : `${req.body.name} dish updated.`
      });

   } catch (e) {
     const error = new CustomError(500,'Error while updating the dish');
     return next(error); 
   }

}

// function for adding category
export const addCatgory = async (req:Request,res:Response,next:NextFunction) => {
   if(!req.isAdmin) {
      const error = new CustomError(401,'You are not authorizd as a admin');
      return next(error);  
     }
   try {

      const category = await poolDB.query('INSERT INTO categories(category_id,name) VALUES(uuid_generate_v4(),$1) RETURNING("category_id")',[req.body.name])
      res.json({
         'message' : `${req.body.name} category added with ${category.rows[0].category_id} id.`
      });

   } catch (e) {
    console.log(e);
     const error = new CustomError(500,'Error while adding the category');
     return next(error); 
    
   }

}

// function for deleting the category
export const deleteCategory = async (req:Request,res:Response,next:NextFunction) => {
   if(!req.isAdmin) {
      const error = new CustomError(401,'You are not authorizd as a admin');
      return next(error);  
     }
   try {
      
      await poolDB.query('DELETE FROM categories WHERE name=$1',[req.params.categoryname])
      res.json({
         'message' : `${req.params.categoryname} category deleted.`
      });
   } catch (e) {
     const error = new CustomError(500,'Error while deleting the category');
     return next(error); 
   }

}