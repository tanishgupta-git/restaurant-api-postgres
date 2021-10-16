import { Request,Response,NextFunction } from 'express';
import { poolDB } from '../db/connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RandomUUIDOptions } from 'crypto';

export const userSignup = async (req:Request,res:Response,next:NextFunction) => {
  try {
    // const values = [req.body.name,req.body.email,req.body.password]
    const password = '123456';
    const hashedPw = await bcrypt.hash(password, 12);
    const values = ['meggi','__meggi26','meggi12@gmail.com',hashedPw,'1234567890']
    const user = await poolDB.query('INSERT INTO users(id,name,username,email,password,phone) VALUES (uuid_generate_v4(),$1,$2,$3,$4,$5) RETURNING("id")',values);
    res.json({
       'message' : `user added with ${user.rows[0].id}`
    });
   } catch (e) {
     console.log(e);
     res.json("Either the account alreay exist or try again later");
   }
}

type resUType = {
  email : String,
  id : RandomUUIDOptions,
  password : string 
}
export const userLogin = async (req:Request,res:Response,next:NextFunction) => {
  // const username : string = req.body.username;
  // const password : string= req.body.password;
  const username : string = '__meggi26';
  const password : string = '123456';
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
      userId: loadedUser.id.toString()
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