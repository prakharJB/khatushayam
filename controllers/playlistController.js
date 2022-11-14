import PlaylistModel from '../models/playlist.js';
import SongsModal from "../models/songs.js";
import fs from "fs";
const path = "http://localhost:3100/playlistImg/"
const songpath = "http://localhost:3100/songImg/"

class PlaylistController {

    static getAllPlaylist = async (req,res) => {
        try {
            const result = await PlaylistModel.find();
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

    static getSinglePlaylist = async (req, res) => {
        try {
            const result = await PlaylistModel.findById(req.params.id);
            result.image = path + result.image;
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }


    static getSongsbyPlaylist = async (req, res) => {
        try{
            const data = await PlaylistModel.findById(req.params.id);
             var playlistName = data.playlist
            const result = await SongsModal.find({playlist : playlistName});
            var newresult =[];
            newresult = result.map((x)=>{
             x.image = songpath +x.image;
             x.song = songpath +x.song;
             return x
            })
            res.send(newresult);
        } catch (error){
            console.log(error)
        }
    }

    static createPlaylist =  async (req, res) =>{
        try {
                //console.log(req.file)
                //console.log(req.body)
                var data = JSON.parse(req.body.data)
                const doc = new PlaylistModel({
                    image : req.file.filename,
                    title : data.title,
                    playlist: data.playlist
                });
                const result = await doc.save();
                res.status(201).send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static updatePlaylistById = async (req, res)=>{
        try{
            let id = req.params.id;
            let new_img = "";
            var data = JSON.parse(req.body.data)
            var img = data.image
            var arr = img.split("playlistImg");

            if (req.file){
                new_img = req.file.filename;
                try{
                    fs.unlinkSync("./public/playlistImg/"+  arr[1])
                } catch (err){
                    console.log(err)
                }
            } else {
                new_img = req.body.image;
            }
         
            await PlaylistModel.findByIdAndUpdate(id, {
                image : new_img,
                title : data.title,
                playlist : data.playlist 
            });
            res.send({success:true});    
        }catch (error) {
            console.log(error);
        }
    }

    static deletePlaylistById = async (req, res) => {
        try {
            PlaylistModel.findByIdAndDelete(req.params.id, (err, result)=>{
               if(result.image != ""){
                   try{
                       fs.unlinkSync('./public/playlistImg/'+result.image)
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
export default PlaylistController;    