import express,{ Application,NextFunction,Request,Response } from "express";
import AuthRoutes from './routes/auth';
import UserRoutes from './routes/user';

const app : Application = express();
const PORT = process.env.PORT || 5000;

app.use('/auth',AuthRoutes);
app.use('/user',UserRoutes);
app.get('/',(req:Request,res:Response,next:NextFunction) => {
    res.send("Hello from CRM api");
})

app.listen(PORT,() => {
    console.log("Server Started");
})