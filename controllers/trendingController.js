import TrendingModel from "../models/trending.js";
import fs from "fs";
const path = "http://localhost:3100/TrendingSongImg/"


class TrendingController {
   

    static getTrendingSongs = async (req,res) => {
        try {
            const result = await TrendingModel.find();
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

    static getSingleTrendingSongs = async (req, res) => {
        try {
            const result = await TrendingModel.findById(req.params.id);
            result.image = path + result.image;
            result.song = path + result.song;
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }


    static createTrendingSongs =  async (req, res) =>{
        //console.log(req.files)
        try {
            //console.log(req.body)
            //console.log(req.files)

            var data = JSON.parse(req.body.data)
            
                const doc = new TrendingModel({
                    image : req.files.files[0].filename,
                    song : req.files.files[1].filename,
                    track : data.track,
                    duration: data.duration,
                    artist : data.artist
                });
                const result = await doc.save();
                console.log(result)
                res.status(201).send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static updateTrendingSongsById = async (req, res)=>{
        try{
            console.log(req.body)
            console.log(req.files)
            let id = req.params.id;
            let new_img = "";
            let new_audio ="";
            var data = JSON.parse(req.body.data)
            var img = data.image
            var arr = img.split("TrendingSongImg");
            var song = data.song
            var arr2 = song.split("TrendingSongImg");

            if (req.files.files){
                console.log(req.files.files)
                
                new_img = req.files.files[0].filename;
                
                try{
                    fs.unlinkSync("./public/TrendingSongImg/"+ arr[1])
                } catch (err){
                    console.log(err)
                }
            } else {
                new_img = req.body.old_image;
            }
            if (req.files.audio){
                console.log(req.files.audio)
                new_audio = req.files.audio[0].filename;
                try{
                    fs.unlinkSync("./public/TrendingSongImg/"+ arr2[1])
                } catch (err){
                    console.log(err)
                }
            }else {
                new_audio = req.body.old_audio;
            }
         
            await TrendingModel.findByIdAndUpdate(id, {
                image : new_img,
                song : new_audio,
                track : data.track,
                duration: data.duration,
                artist : data.artist
            });
            res.send({success:true});
        }catch (error) {
            console.log(error);
        }
    }

    static deleteTrendingSongsById = (req, res) => {
        try {
            TrendingModel.findByIdAndDelete(req.params.id, (err, result)=>{
                if(result.image != ""){
                    try{
                        fs.unlinkSync('./public/TrendingSongImg/'+result.image)
                        fs.unlinkSync('./public/TrendingSongImg/'+result.song)
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

export default TrendingController;