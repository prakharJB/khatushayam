import CategoryModel from "../models/category.js";
import SongsModel from "../models/songs.js";
import fs from "fs";

class CategoryController {

    static getAllCate = async (req,res) => {
        try {
            const result = await CategoryModel.find();
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static getSingleCate = async (req, res) => {
        try {
            const result = await CategoryModel.findById(req.params.id);
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
            res.send(result);
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
                    fs.unlinkSync("./public/uploads/"+ req.body.old_image)
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
                        fs.unlinkSync('./public/uploads/'+result.image)
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