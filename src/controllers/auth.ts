import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
     console.log(e);
     res.json("Either the account alreay exist or try again later");
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
    res.json({
      "message" : "User not found"
    })
  }
  loadedUser = user;
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {

      res.json({
        "message" : "Wrong username or password"
      })
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
      console.log(err);
      res.json("Error in login")
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
    res.json({
      "message" : "Admin not found"
    })
  }
  loadedAdmin = admin;
  const isEqual = await bcrypt.compare(password, admin.password);
  if (!isEqual) {

      res.json({
        "message" : "Wrong username or password"
      })
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
      console.log(err);
      res.json("Error in login")
    }
  
} 

// function for adding admin
export const addAdmin = async (req:Request,res:Response,next:NextFunction) => {
   if(!req.isAdmin) {
         res.json({
           "message" : "Permission denied for adding admin"
         })
         return;
   }
   try {
    const password = req.body.password;
    const hashedPw = await bcrypt.hash(password, 12);
    const values = [req.body.name,req.body.username,req.body.email,hashedPw]

    const user = await poolDB.query('INSERT INTO admins(id,name,username,email,password) VALUES (uuid_generate_v4(),$1,$2,$3,$4) RETURNING("id")',values);
    res.json({
       'message' : `admin added with ${user.rows[0].id}`
    });
   } catch (e) {
     console.log(e);
     res.json("Either the account alreay exist or try again later");
   }
}