import mongoose from "mongoose";

//Defining Schema
const songsSchema = new mongoose.Schema({
    artist:{type:String},
    track:{type:String},
    duration:{type:String},
    image:{type:String},
    song:{type:String},
    category:[{type:String}],
    playlist:[{type:String}]
})

//Model
const SongsModel = mongoose.model("song", songsSchema);

export default SongsModel;