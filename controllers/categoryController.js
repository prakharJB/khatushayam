import CategoryModel from "../models/category.js";
import SongsModel from "../models/songs.js";
import fs from "fs";
const path = "http://localhost:3100/categoryImg/";
const songpath = "http://localhost:3100/songImg/";

class CategoryController {
  static getAllCate = async (req, res) => {
    try {
      const result = await CategoryModel.find();
      var newresult = [];
      newresult = result.map((x) => {
        x.image = path + x.image;
        return x;
      });
      res.send(newresult);
    } catch (error) {
      console.log(error);
    }
  };

  static getSomeCate = async (req, res) => {
    try {
      const result = await CategoryModel.find().limit(5);
      var newresult = [];
      newresult = result.map((x) => {
        x.image = path + x.image;
        return x;
      });
      res.send(newresult);
    } catch (error) {
      console.log(error);
    }
  };

  static getSingleCate = async (req, res) => {
    try {
      const result = await CategoryModel.findById(req.params.id);
      result.image = path + result.image;
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };

  static getSongsbyCate = async (req, res) => {
    try {
      const data = await CategoryModel.findById(req.params.id);
      var cate = data.category;
      const result = await SongsModel.find({ category: cate });
      var newresult = [];
      newresult = result.map((x) => {
        x.image = songpath + x.image;        
        x.song = songpath + x.song;
        return x;
      });
      res.send(newresult);
    } catch (error) {
      console.log(error);
    }
  };

  static createCategory = async (req, res) => {
    try {
      //console.log(req.body)
      //console.log(req.file)
      var data = JSON.parse(req.body.data)
      //console.log(data)

      const doc = new CategoryModel({
        image: req.file.filename,
        title: data.title,
        category: data.category,
      });
      //console.log(req.file)
      const result = await doc.save();
      res.status(201).send(result);
    } catch (error) {
      console.log(error);
    }
  };

  static updateCategoryById = async (req, res) => {
    try {
      let id = req.params.id;
      let new_img = "";
      var data = JSON.parse(req.body.data)
      var img = data.image
      var arr = img.split("categoryImg");

      // console.log(req.body)
      // console.log(req.file)
      // console.log(arr[1])

      if (req.file) {
        new_img = req.file.filename;
        try {
          fs.unlinkSync("./public/categoryImg" + arr[1]);
        } catch (err) {
          console.log(err);
        }
      } else {
        new_img = req.body.image;
      }

      await CategoryModel.findByIdAndUpdate(id, {
        image: new_img,
        title: data.title,
        category: data.category,
      });
      res.send({ success: true });
    } catch (error) {
      console.log(error);
    }
  };

  static deleteCategoryById = (req, res) => {
    try {
      CategoryModel.findByIdAndDelete(req.params.id, (err, result) => {
        if (result.image != "") {
          try {
            fs.unlinkSync("./public/categoryImg/" + result.image);
          } catch (err) {
            console.log(err);
          }
        }
        res.send({ success: true });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default CategoryController;
