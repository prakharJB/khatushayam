import SongsModel from "../models/songs.js";
import fs from "fs";

class SongsController {

    static getAllSongs = async (req,res) => {
        try {
            const result = await SongsModel.find();
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static getTrendingSongs = async (req,res) => {
        try {
            const result = await SongsModel.find().limit(15);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static getSingleSongs = async (req, res) => {
        try {
            const result = await SongsModel.findById(req.params.id);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static getSongsBySearch = async (req ,res) =>{
        try{
           const result = await SongsModel.find({
            "$or" : [
                {track : { $regex: req.params.key}},
                {artist : { $regex: req.params.key}},
                {category : { $regex: req.params.key}}
            ]
        })
            if(result == ""){
                res.send("No result found!")
            }else{
                res.send(result);
            }
           
        } catch (error){
            console.log(error)
        }
    }

    static createSongs =  async (req, res) =>{
        //console.log(req.files)
        try {
                const doc = new SongsModel({
                    image : req.files.files[0].filename,
                    song : req.files.audio[0].filename,
                    track : req.body.track,
                    duration: req.body.duration,
                    artist : req.body.artist,
                    category: req.body.category
                });
                const result = await doc.save();
                res.status(201).send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static updateSongsById = async (req, res)=>{
        try{
            let id = req.params.id;
            let new_img = "";
            let new_audio ="";

            if (req.files.files){
                //console.log(req.files.files)
                
                new_img = req.files.files[0].filename;
                
                try{
                    fs.unlinkSync("./public/songImg/"+ req.body.old_image)
                } catch (err){
                    console.log(err)
                }
            } else {
                new_img = req.body.old_image;
            }
            if (req.files.audio){
                //console.log(req.files.audio)
                new_audio = req.files.audio[0].filename;
                try{
                    fs.unlinkSync("./public/songImg/"+ req.body.old_audio)
                } catch (err){
                    console.log(err)
                }
            }else {
                new_audio = req.body.old_audio;
            }
         
            await SongsModel.findByIdAndUpdate(id, {
                image : new_img,
                song : new_audio,
                track : req.body.track,
                duration: req.body.duration,
                artist : req.body.artist,
                category: req.body.category
            });
            res.send({success:true});    
        }catch (error) {
            console.log(error);
        }
    }

    static deleteSongsById = (req, res) => {
        try {
             SongsModel.findByIdAndDelete(req.params.id, (err, result)=>{
                if(result.image != ""){
                    try{
                        fs.unlinkSync('./public/songImg/'+result.image)
                        fs.unlinkSync('./public/songImg/'+result.song)
                    } catch(err){
                        console.log(err)
                    }
                }
                res.send({success:true});
        });
        } catch (error) {
            console.log(error);
        }
    }

}

export default SongsController;