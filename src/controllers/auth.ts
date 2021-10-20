import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import CustomError from '../customTypes/errorType';

interface resUType {
  email : String,
  id : String,
  password : string 
}

// function for user signup
export const userSignup = async (req:Request,res:Response,next:NextFunction) => {
  try {
    const password = req.body.password;
    const hashedPw = await bcrypt.hash(password, 12);
    const values = [req.body.name,req.body.username,req.body.email,hashedPw,req.body.phone]
    const user = await poolDB.query('INSERT INTO users(id,name,username,email,password,phone) VALUES (uuid_generate_v4(),$1,$2,$3,$4,$5) RETURNING("id")',values);
    res.json({
       'message' : `user added with ${user.rows[0].id}`
    });
   } catch (e) {
    const error = new CustomError(500,'Either the user already exist or try again later');
    return next(error); 
   }
}

// function for user login
export const userLogin = async (req:Request,res:Response,next:NextFunction) => {
  const username : string = req.body.username;
  const password : string= req.body.password;

  let loadedUser : resUType;
  try {
  const result = await poolDB.query('SELECT * FROM users WHERE username = $1',[username]);
  
  // check if user find or not
  const user : resUType = result.rows[0];
  if (!user) {
    const error = new CustomError(403,'User not found');
    return next(error);
  }
  loadedUser = user;
  console.log("After the not found check")
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
     const error = new CustomError(401,'email or password is incorrect');
     return next(error);
  }
  const token = jwt.sign(
    {
      email: loadedUser.email,
      userId: loadedUser.id
    },
    'somesupersecretsecret',
    { expiresIn: '1h' }
  );
 
  res.status(200).json({ token: token, userId: loadedUser.id.toString(),typeOfuser:"User"});
  } catch (err) {
    const error = new CustomError(500,'Server error');
    return next(error); 
    }
  
} 

// function for admin login
export const adminLogin = async (req:Request,res:Response,next:NextFunction) => {
  const username : string = req.body.username;
  const password : string= req.body.password;

  let loadedAdmin : resUType;
  try {
  const result = await poolDB.query('SELECT * FROM admins WHERE username = $1',[username]);
  
  // check if admin find or not
  const admin : resUType = result.rows[0];
  console.log(admin);
  if (!admin) {
    const error = new CustomError(403,'Admin not found');
    return next(error);
  }
  loadedAdmin = admin;
  const isEqual = await bcrypt.compare(password, admin.password);
  if (!isEqual) {
    const error = new CustomError(401,'Email or password is incorrect');
    return next(error); 
  }
  const token = jwt.sign(
    {
      email: loadedAdmin.email,
      userId: loadedAdmin.id
    },
    'somesupersecretsecret',
    { expiresIn: '1h' }
  );
 
  res.status(200).json({ token: token, userId: loadedAdmin.id,typeOfuser:"Admin"});
  } catch (err) {
    const error = new CustomError(500,'Server error');
    return next(error); 
    }
  
} 
