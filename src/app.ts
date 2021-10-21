import express,{ Application,NextFunction,Request,Response } from "express";
import AuthRoutes from './routes/auth';
import UserRoutes from './routes/user';
import AdminRoutes from './routes/admin';

import CustomError from "./customTypes/errorType";

const app : Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/auth',AuthRoutes);
app.use('/user',UserRoutes);
app.use('/admin',AdminRoutes);
app.get('/',(req:Request,res:Response,next:NextFunction) => {
    res.send("Hello from restaurant api");
})


app.use((error: CustomError,req : Request,res : Response,next : NextFunction) => {
    console.log(error)
    const status = error.status || 500;
    const message = error.message || 'Server Error';
    res.status(status).json({ message : message});  
})


app.listen(PORT,() => {
    console.log("Server Started");
})