import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/connectDB';

const dotenv = require('dotenv');
dotenv.config({path: 'src/.env'});


let app = express();

const cors = require('cors');

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//config app 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

viewEngine(app);
initWebRoutes(app)

connectDB();

let port = process.env.PORT || 6060;

// port === undefined => port = 6060
app.listen(port, ()=>{
    //callback
    console.log("Backend Nodejs is runing on the port: " +port)
})