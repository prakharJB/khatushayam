import SongsModel from "../models/songs.js";

class SongsController {

    static getAllSongs = async (req,res) => {
        try {
            const result = await SongsModel.find();
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

}

export default SongsController;