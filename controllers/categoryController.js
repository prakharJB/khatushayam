import CategoryModel from "../models/category.js";
import SongsModel from "../models/songs.js";
import fs from "fs";

class CategoryController {

    static getAllCate = async (req,res) => {
        try {
            const result = await CategoryModel.find();
            var newresult =[];
            newresult = result.map((x)=>{
             x.image = "http://68.178.166.203:3000/categoryImg/"+x.image;
             return x;
            })
            res.send(newresult);
        } catch (error) {
            console.log(error);
        }
    }

    static getSomeCate = async (req,res) => {
        try {
            const result = await CategoryModel.find().limit(5);
            var newresult =[];
            newresult = result.map((x)=>{
             x.image = "http://68.178.166.203:3000/categoryImg/"+x.image;
             return x;
            })
            res.send(newresult);
        } catch (error) {
            console.log(error);
        }
    }


    static getSingleCate = async (req, res) => {
        try {
            const result = await CategoryModel.findById(req.params.id);
            result.image = 'http://68.178.166.203:3000/categoryImg/' + result.image;
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }
    


    static getSongsbyCate = async (req, res) => {
        try{
            const data = await CategoryModel.findById(req.params.id);
             var cate = data.category
            const result = await SongsModel.find({category : cate});
            var newresult =[];
            newresult = result.map((x)=>{
             x.image = "http://68.178.166.203:3000/songImg/"+x.image;
             x.song = "http://68.178.166.203:3000/songImg/"+x.song;
             return x
            })
            res.send(newresult);
        } catch (error){
            console.log(error)
        }
    }

    static createCategory =  async (req, res) =>{
        try {
                const doc = new CategoryModel({
                    image : req.file.filename,
                    title : req.body.title,
                    category: req.body.category
                });
                const result = await doc.save();
                res.status(201).send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static updateCategoryById = async (req, res)=>{
        try{
            let id = req.params.id;
            let new_img = "";

            if (req.file){
                new_img = req.file.filename;
                try{
                    fs.unlinkSync("./public/categoryImg/"+ req.body.old_image)
                } catch (err){
                    console.log(err)
                }
            } else {
                new_img = req.body.old_image;
            }
         
            await CategoryModel.findByIdAndUpdate(id, {
                image : new_img,
                title : req.body.title,
                category : req.body.category 
            });
            res.send({success:true});    
        }catch (error) {
            console.log(error);
        }
    }
    
    static deleteCategoryById = (req, res) => {
        try {
             CategoryModel.findByIdAndDelete(req.params.id, (err, result)=>{
                if(result.image != ""){
                    try{
                        fs.unlinkSync('./public/categoryImg/'+result.image)
                    } catch(err){
                        console.log(err)
                    }
                }
                res.send({success:true});
        });
        } catch (error) {
            console.log(error);
        }
    }



}

export default CategoryController;