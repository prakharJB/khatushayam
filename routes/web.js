import express from "express";
const router = express.Router();
import SongsController from "../controllers/songsController.js";
import CategoryController from "../controllers/categoryController.js";
import ArtistController from "../controllers/artistController.js";
import PlaylistController from "../controllers/playlistController.js";
import EventController from "../controllers/eventController.js";
import AdminController from "../controllers/adminController.js";
import categoryImg from "../utils/categoryImg.js";
import artistImg from "../utils/artistImg.js";
import songImg from "../utils/songs.js";
import playlistImg from "../utils/playlist.js";

router.get("/songs", SongsController.getAllSongs);
router.get("/trending", SongsController.getTrendingSongs);
router.get("/trending/:id", SongsController.getSingleTrendingSongs);
router.get("/songs/:id", SongsController.getSingleSongs);
router.get("/search/:key", SongsController.getSongsBySearch);
router.post("/songs", songImg, SongsController.createSongs);
router.put("/songs/:id", songImg, SongsController.updateSongsById);
router.delete("/songs/:id", SongsController.deleteSongsById);

router.get("/event", EventController.getAllEvent);
router.get("/event/:id", EventController.getSingleEvent);
router.post("/event", EventController.createEvent);
router.put("/event/:id", EventController.updateEventById);
router.delete("/event/:id", EventController.deleteEventById);

router.get("/category", CategoryController.getAllCate);
router.get("/category/songs", CategoryController.getSomeCate);
router.get("/category/:id", CategoryController.getSingleCate);
router.get("/category/songs/:id", CategoryController.getSongsbyCate);
router.post("/category", categoryImg, CategoryController.createCategory);
router.put("/category/:id", categoryImg, CategoryController.updateCategoryById);
router.delete("/category/:id", CategoryController.deleteCategoryById);

router.get("/artist", ArtistController.getAllArtist);
router.get("/artist/songs", ArtistController.getFourArtist);
router.get("/artist/:id", ArtistController.getSingleArtist);
router.get("/artist/songs/:id", ArtistController.getSongsbyArtist);
router.post("/artist", artistImg, ArtistController.createArtist);
router.put("/artist/:id", artistImg, ArtistController.updateArtistById);
router.delete("/artist/:id", ArtistController.deleteArtistById);

router.get("/playlist", PlaylistController.getAllPlaylist);
router.get("/playlist/:id", PlaylistController.getSinglePlaylist);
router.get("/playlist/songs/:id", PlaylistController.getSongsbyPlaylist);
router.post("/playlist", playlistImg, PlaylistController.createPlaylist);
router.put("/playlist/:id", playlistImg, PlaylistController.updatePlaylistById);
router.delete("/playlist/:id",playlistImg,PlaylistController.deletePlaylistById);

router.post("/login", AdminController.verifyLogin);

export default router;
