import multer from "multer";
import fs from "fs";

var storage = multer.diskStorage({
    destination : function(req, file, cb){
        var dir = "./public/RecommendedSongImg";

        if(!fs.existsSync(dir))
        {
            fs.mkdirSync(dir);
        }
        cb(null,dir);

    },
    filename : function(req, file, cb){
        cb(null, file.originalname);
    }
});


var RecommendedSongImg = multer({storage:storage}).fields([{
    name: 'audio'
  }, {
    name: 'files'
  }])


export default RecommendedSongImg;