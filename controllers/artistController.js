import ArtistModal from '../models/artist.js';
import SongsModal from "../models/songs.js";
import fs from "fs";
const path = "http://localhost:3100/artistImg/"
const songpath = "http://localhost:3100/songImg/"

class ArtistController {

    static getAllArtist = async (req,res) => {
        try {
            const result = await ArtistModal.find();
            // res.send(result);
            var newresult =[];
            newresult = result.map((x)=>{
             x.image = path + x.image;
             return x;
            })
            res.send(newresult);
        } catch (error) {
            console.log(error);
        }
    }

    static getFourArtist = async (req,res) => {
        try {
            const result = await ArtistModal.find().limit(4);
            var newresult =[];
            newresult = result.map((x)=>{
             x.image = path +x.image;
             return x;
            })
            res.send(newresult);
        } catch (error) {
            console.log(error);
        }
    }

    static getSingleArtist = async (req, res) => {
        try {
            let result = await ArtistModal.findById(req.params.id);
            result.image = path + result.image;
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }


    static getSongsbyArtist = async (req, res) => {
        try{
            const data = await ArtistModal.findById(req.params.id);
             var artistName = data.artist
            const result = await SongsModal.find({artist : artistName});
            var newresult =[];
            newresult = result.map((x)=>{
             x.image = songpath+x.image;
             x.song = songpath +x.song;
             return x
            })
            res.send(newresult);
        } catch (error){
            console.log(error)
        }
    }

    static createArtist =  async (req, res) =>{
        try {

            var data = JSON.parse(req.body.data)
            const doc = new ArtistModal({
                artist: data.artist,
                image : req.file.filename
            });
            const result = await doc.save();
            res.status(201).send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static updateArtistById = async (req, res) => {
        try{
            let id = req.params.id;
            let new_img = "";
            var data = JSON.parse(req.body.data)
            var img = data.image
            var arr = img.split("artistImg/");

            if (req.file){
                new_img = req.file.filename;
                try{
                    fs.unlinkSync("./public/artistImg/"+arr[1])
                } catch (err){
                    console.log(err)
                }
            } else {
                new_img = req.body.image;
            }
         
            await ArtistModal.findByIdAndUpdate(id, {
                image : new_img,
                artist : data.artist
            });
            res.send({success:true});    
        } catch (error) {
            console.log(error);
        }
    }

    static deleteArtistById = async (req, res) => {
        try {
            ArtistModal.findByIdAndDelete(req.params.id, (err, result)=>{
               if(result.image != ""){
                   try{
                       fs.unlinkSync('./public/artistImg/'+result.image)
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

export default ArtistController;