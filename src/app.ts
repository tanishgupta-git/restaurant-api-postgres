import express,{ Application,NextFunction,Request,Response } from "express";



const app : Application = express();
const PORT = process.env.PORT || 5000;

app.get('/',(req:Request,res:Response,next:NextFunction) => {
    res.send("Hello from CRM api.");
})

app.listen(PORT,() => {
    console.log("Server Started");
})