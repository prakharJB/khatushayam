import PlaylistModel from '../models/playlist.js';
import SongsModal from "../models/songs.js";

class PlaylistController {

    static getAllPlaylist = async (req,res) => {
        try {
            const result = await PlaylistModel.find();
            var newresult =[];
            newresult = result.map((x)=>{
             x.image = "http://localhost:3100/playlistImg/"+x.image;
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
            result.image = 'http://localhost:3100/playlistImg/' + result.image;
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
             x.image = "http://localhost:3100/songImg/"+x.image;
             x.song = "http://localhost:3100/songImg/"+x.song;
             return x
            })
            res.send(newresult);
        } catch (error){
            console.log(error)
        }
    }

    static createPlaylist =  async (req, res) =>{
        try {
                const doc = new PlaylistModel({
                    image : req.file.filename,
                    title : req.body.title,
                    playlist: req.body.playlist
                });
                const result = await doc.save();
                res.status(201).send(result);
        } catch (error) {
            console.log(error);
        }
    }

}
export default PlaylistController;    