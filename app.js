import express from "express";
import connectDB from './db/connectDb.js';
import web from './routes/web.js';
import 'dotenv/config';
const app = express();
const port = process.env.PORT ;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb+srv://jmbliss46:1998prakhar@cluster0.rymzopb.mongodb.net/test"

//Database Connection
connectDB(DATABASE_URL);

//JSON
app.use(express.json());

//Load Routes
app.use('/', web);

//connecting folder
app.use(express.static('public'));


app.listen(port, ()=> {
    console.log(`Server listening at http://localhost:${port}`);
});
