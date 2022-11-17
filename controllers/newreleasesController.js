import NewReleasesModel from "../models/newreleases.js";
import fs from "fs";
const path = "http://localhost:3100/NewReleasesSongImg/"


class NewReleasesController {
   

    static getNewReleasesSongs = async (req,res) => {
        try {
            const result = await NewReleasesModel.find();
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

    static getSingleNewReleasesSongs = async (req, res) => {
        try {
            const result = await NewReleasesModel.findById(req.params.id);
            result.image = path + result.image;
            result.song = path + result.song;
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }


    static createNewReleasesSongs =  async (req, res) =>{
        //console.log(req.files)
        try {
            console.log(req.body)
            console.log(req.files)

            var data = JSON.parse(req.body.data)
            
                const doc = new NewReleasesModel({
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

    static updateNewReleasesSongsById = async (req, res)=>{
        try{
            console.log(req.body)
            console.log(req.files)
            let id = req.params.id;
            let new_img = "";
            let new_audio ="";
            var data = JSON.parse(req.body.data)
            var img = data.image
            var arr = img.split("NewReleasesSongImg/");
            var song = data.song
            var arr2 = song.split("NewReleasesSongImg/");

            if (req.files.files){
                //console.log(req.files.files)
                
                new_img = req.files.files[0].filename;
                new_audio = req.files.files[1].filename;
                try{
                    fs.unlinkSync("./public/NewReleasesSongImg/"+ arr[1])
                    fs.unlinkSync("./public/NewReleasesSongImg/"+ arr2[1])
                } catch (err){
                    console.log(err)
                }
            } else {
                new_img = arr[1];
                new_audio = arr2[1];
            }
         
            await NewReleasesModel.findByIdAndUpdate(id, {
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

    static deleteNewReleasesSongsById = (req, res) => {
        try {
            NewReleasesModel.findByIdAndDelete(req.params.id, (err, result)=>{
                if(result.image != ""){
                    try{
                        fs.unlinkSync('./public/NewReleasesSongImg/'+result.image)
                        fs.unlinkSync('./public/NewReleasesSongImg/'+result.song)
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

export default NewReleasesController;