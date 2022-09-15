import express from 'express';
const router = express.Router();
import multer from "multer";
import fs from "fs";
import SongsController from '../controllers/songsController.js';
import CategoryController from '../controllers/categoryController.js';
import ArtistController from '../controllers/artistController.js';

var storage = multer.diskStorage({
    destination : function(req, file, cb){
        var dir = "./public/uploads";

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
var upload = multer({storage:storage}).single('files');



router.get('/songs', SongsController.getAllSongs);
router.get('/songs/:id',SongsController.getSingleSongs);



router.get('/category', CategoryController.getAllCate);
router.get('/category/:id', CategoryController.getSingleCate);
router.get('/category/songs/:id', CategoryController.getSongsbyCate);
router.post('/category',upload,CategoryController.createCategory);
router.put('/category/:id',upload,CategoryController.updateCategoryById);
router.delete('/category/:id',CategoryController.deleteCategoryById);



router.get('/artist', ArtistController.getAllArtist);
router.get('/artist/:id', ArtistController.getSingleArtist);
router.get('/artist/songs/:id', ArtistController.getSongsbyArtist);
router.post('/artist', ArtistController.createArtist);
router.put('/artist/:id', ArtistController.updateArtistById);
router.delete('/artist/:id', ArtistController.deleteArtistById);


export default router;