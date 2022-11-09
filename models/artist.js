import mongoose from "mongoose";

//Defining Schema
const artistSchema = new mongoose.Schema({
   artist:{type:String}, 
   image:{type:String} 
})

//Model
const ArtistModel = mongoose.model("artist", artistSchema);

export default ArtistModel;