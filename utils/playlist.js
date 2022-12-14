import multer from "multer";
import fs from "fs";

var storage = multer.diskStorage({
    destination : function(req, file, cb){
        var dir = "./public/playlistImg";

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


var playlistImg = multer({storage:storage}).single('files');


export default playlistImg;