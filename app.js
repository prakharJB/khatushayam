import express from "express";
import connectDB from './db/connectDb.js';
import web from './routes/web.js';
import 'dotenv/config';
import cors from 'cors';
const app = express();
const port = process.env.PORT || "3100" ;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://jmbliss46:1998prakhar@cluster0.rymzopb.mongodb.net/test"

//Database Connection
connectDB(DATABASE_URL);

//FOR CORS Policy
app.use(cors());

//JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Load Routes
app.use('/', web);


//connecting folder
app.use(express.static('public'));


app.listen(port, ()=> {
    console.log(`Server listening at http://localhost:${port}`);
});
