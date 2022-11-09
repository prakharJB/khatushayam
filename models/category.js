import mongoose from "mongoose";

//Defining Schema
const categorySchema = new mongoose.Schema({
   category:{type:String},
   title:{type:String},
   image:{type:String} 
})

//Model
const CategoryModel = mongoose.model("category", categorySchema);

export default CategoryModel;