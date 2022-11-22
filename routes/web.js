import express from "express";
const router = express.Router();

//Controller 
import SongsController from "../controllers/songsController.js";
import RecommandedController from "../controllers/recommandedController.js";
import TrendingController from "../controllers/trendingController.js";
import CategoryController from "../controllers/categoryController.js";
import ArtistController from "../controllers/artistController.js";
import PlaylistController from "../controllers/playlistController.js";
import NewReleasesController from "../controllers/newreleasesController.js";
import EventController from "../controllers/eventController.js";
import AdminController from "../controllers/adminController.js";

//Image and Songs Add Logic 
import categoryImg from "../utils/categoryImg.js";
import artistImg from "../utils/artistImg.js";
import songImg from "../utils/songs.js";
import RecommendedSongImg from "../utils/recommended.js";
import TrendingSongImg from "../utils/trending.js";
import playlistImg from "../utils/playlist.js";
import NewReleasesSongImg from "../utils/newreleases.js";

//Songs API
router.get("/songs", SongsController.getAllSongs);
router.get("/songs/:id", SongsController.getSingleSongs);
router.get("/search/:key", SongsController.getSongsBySearch);
router.post("/songs", songImg, SongsController.createSongs);
router.put("/songs/:id", songImg, SongsController.updateSongsById);
router.delete("/songs/:id", SongsController.deleteSongsById);

//Trending API
router.get("/trending", TrendingController.getTrendingSongs);
router.get("/trending/:id", TrendingController.getSingleTrendingSongs);
router.post("/trending",TrendingSongImg, TrendingController.createTrendingSongs);
router.put("/trending/:id",TrendingSongImg, TrendingController.updateTrendingSongsById);
router.delete("/trending/:id", TrendingController.deleteTrendingSongsById);

//Recommended API
router.get("/recommended", RecommandedController.getRecommandedSongs);
router.get("/recommended/:id", RecommandedController.getSingleRecommandedSongs);
router.post("/recommended",RecommendedSongImg, RecommandedController.createRecommandedSongs);
router.put("/recommended/:id",RecommendedSongImg, RecommandedController.updateRecommandedSongsById);
router.delete("/recommended/:id", RecommandedController.deleteRecommandedSongsById);

//New Releases API
router.get("/newreleases", NewReleasesController.getNewReleasesSongs);
router.get("/newreleases/:id", NewReleasesController.getSingleNewReleasesSongs);
router.post("/newreleases",NewReleasesSongImg, NewReleasesController.createNewReleasesSongs);
router.put("/newreleases/:id",NewReleasesSongImg,  NewReleasesController.updateNewReleasesSongsById);
router.delete("/newreleases/:id",  NewReleasesController.deleteNewReleasesSongsById);

// Event API
router.get("/event", EventController.getAllEvent);
router.get("/event/:id", EventController.getSingleEvent);
router.post("/event", EventController.createEvent);
router.put("/event/:id", EventController.updateEventById);
router.delete("/event/:id", EventController.deleteEventById);

//Category API
router.get("/category", CategoryController.getAllCate);
router.get("/category/songs", CategoryController.getSomeCate);
router.get("/category/:id", CategoryController.getSingleCate);
router.get("/category/songs/:id", CategoryController.getSongsbyCate);
router.post("/category", categoryImg, CategoryController.createCategory);
router.put("/category/:id", categoryImg, CategoryController.updateCategoryById);
router.delete("/category/:id", CategoryController.deleteCategoryById);

//Artist API
router.get("/artist", ArtistController.getAllArtist);
router.get("/artist/songs", ArtistController.getFourArtist);
router.get("/artist/:id", ArtistController.getSingleArtist);
router.get("/artist/songs/:id", ArtistController.getSongsbyArtist);
router.post("/artist", artistImg, ArtistController.createArtist);
router.put("/artist/:id", artistImg, ArtistController.updateArtistById);
router.delete("/artist/:id", ArtistController.deleteArtistById);

//Playlist API
router.get("/playlist", PlaylistController.getAllPlaylist);
router.get("/playlist/:id", PlaylistController.getSinglePlaylist);
router.get("/playlist/songs/:id", PlaylistController.getSongsbyPlaylist);
router.post("/playlist", playlistImg, PlaylistController.createPlaylist);
router.put("/playlist/:id", playlistImg, PlaylistController.updatePlaylistById);
router.delete("/playlist/:id",PlaylistController.deletePlaylistById);

// Admin login API
router.post("/login", AdminController.verifyLogin);

export default router;
