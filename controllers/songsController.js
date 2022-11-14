import SongsModel from "../models/songs.js";
import fs from "fs";
const path = "http://localhost:3100/songImg/"


class SongsController {
   

    static getAllSongs = async (req,res) => {
        try {
            const result = await SongsModel.find().sort({track : -1});
            var newresult =[];
            newresult = result.map((x)=>{
             x.image = path + x.image;
             x.song = path + x.song;
             return x
            })
            res.send(newresult);
        } catch (error) {
            console.log(error);
        }
    }

    static getTrendingSongs = async (req,res) => {
        try {
            const result = await SongsModel.find().sort({track : -1}).limit(15);
            var newresult =[];
            newresult = result.map((x)=>{
             x.image = path +x.image;
             x.song = path+x.song;
             return x;
            })
            res.send(newresult);
        } catch (error) {
            console.log(error);
        }
    }

    static getSingleTrendingSongs = async (req, res) => {
        try {
            const result = await SongsModel.findById(req.params.id);
            result.image = path + result.image;
            result.song = path + result.song;
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static getSingleSongs = async (req, res) => {
        try {
            const result = await SongsModel.findById(req.params.id);
            result.image = path + result.image;
            result.song = path + result.song;
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
                var newresult =[];
                    newresult = result.map((x)=>{
                    x.image = path+x.image;
                    x.song = path+x.song;
                    return x
                })
                    res.send(newresult);
                
            }
           
        } catch (error){
            console.log(error)
        }
    }

    static createSongs =  async (req, res) =>{
        //console.log(req.files)
        try {
            //console.log(req.files)
            //console.log(req.body)
            var data = JSON.parse(req.body.data)
            
                const doc = new SongsModel({
                    image : req.files.files[0].filename,
                    song : req.files.files[1].filename,
                    track : data.track,
                    duration: data.duration,
                    artist : data.artist,
                    category: data.category,
                    playlist:data.playlist
                });
                const result = await doc.save();
                //console.log(result)
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
            var data = JSON.parse(req.body.data)
            var img = data.image
            var arr = img.split("songImg");
            var song = data.audio
            var arr2 = song.split("songimg");

            if (req.files.files){
                //console.log(req.files.files)
                
                new_img = req.files.files[0].filename;
                
                try{
                    fs.unlinkSync("./public/songImg/"+ arr[1])
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
                    fs.unlinkSync("./public/songImg/"+ arr2[1])
                } catch (err){
                    console.log(err)
                }
            }else {
                new_audio = req.body.old_audio;
            }
         
            await SongsModel.findByIdAndUpdate(id, {
                image : new_img,
                song : new_audio,
                track : data.track,
                duration: data.duration,
                artist : data.artist,
                category: data.category,
                playlist: data.playlist
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