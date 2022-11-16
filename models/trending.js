import mongoose from "mongoose";

//Defining Schema
const trendingSchema = new mongoose.Schema({
    artist:{type:String},
    track:{type:String},
    duration:{type:String},
    image:{type:String},
    song:{type:String}
})

//Model
const TrendingModel = mongoose.model("trending", trendingSchema);

export default TrendingModel;