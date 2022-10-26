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
            const doc = new ArtistModal({
                artist:req.body.artist,
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

            if (req.file){
                new_img = req.file.filename;
                try{
                    fs.unlinkSync("./public/artistImg/"+ req.body.old_image)
                } catch (err){
                    console.log(err)
                }
            } else {
                new_img = req.body.old_image;
            }
         
            await ArtistModal.findByIdAndUpdate(id, {
                image : new_img,
                artist : req.body.artist
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