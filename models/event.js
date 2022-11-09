import mongoose from "mongoose";

//Defining Schema
const eventSchema = new mongoose.Schema({
   date:{type:String},
   place:{type:String},
   address:{type:String}, 
   time:{type:String} 
})

//Model
const EventModel = mongoose.model("event", eventSchema);

export default EventModel;