import mongoose from "mongoose";

//Defining Schema
const adminSchema = new mongoose.Schema({
    email:{type:String},
    password: {type:String}
});



//Model
const AdminModel = mongoose.model("admin", adminSchema);


export default  AdminModel;