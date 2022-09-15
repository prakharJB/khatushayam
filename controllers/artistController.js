import ArtistModal from '../models/artist.js';
import SongsModal from "../models/songs.js";

class ArtistController {

    static getAllArtist = async (req,res) => {
        try {
            const result = await ArtistModal.find();
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static getSingleArtist = async (req, res) => {
        try {
            const result = await ArtistModal.findById(req.params.id);
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
            res.send(result);
        } catch (error){
            console.log(error)
        }
    }

    static createArtist =  async (req, res) =>{
        try {
            const doc = new ArtistModal({
                artist:req.body.artist
            });
            const result = await doc.save();
            res.status(201).send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static updateArtistById = async (req, res) => {
        try {
            const result = await ArtistModal.findByIdAndUpdate(req.params.id, req.body)
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static deleteArtistById = async (req, res) => {
        try {
            const result = await ArtistModal.findByIdAndDelete(req.params.id);
            res.send({success:true});
        } catch (error) {
            console.log(error);
        }
    }


}

export default ArtistController;