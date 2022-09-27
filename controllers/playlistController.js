import PlaylistModal from '../models/playlist.js';
import SongsModal from "../models/songs.js";

class PlaylistController {

    static getAllPlaylist = async (req,res) => {
        try {
            const result = await PlaylistModal.find();
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static getSinglePlaylist = async (req, res) => {
        try {
            const result = await PlaylistModal.findById(req.params.id);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }


    static getSongsbyPlaylist = async (req, res) => {
        try{
            const data = await PlaylistModal.findById(req.params.id);
             var playlistName = data.playlist
            const result = await SongsModal.find({playlist : playlistName});
            res.send(result);
        } catch (error){
            console.log(error)
        }
    }

}
export default PlaylistController;    