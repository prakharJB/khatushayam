import AdminModel from "../models/admin.js";
import sha1 from"sha1";
import jwt from'jsonwebtoken';

class AdminController {
    static verifyLogin = async (req, res) => {
        try{
            // console.log(req.body, "---------------------");
            var e= req.body.email;
            var p = req.body.password;
            //console.log(e)
            //console.log(p)
            const result = await AdminModel.find({email : e})
            //console.log(result)
            //return
            if(result.length > 0)
            {
                if(result[0].password == sha1(p))
                {
                    var token = jwt.sign(result[0].toJSON() , "khatushyam");
                    res.status(200).send({success : true ,token:token})
                }else{
                    res.status(401).send({type :"This Password is Incorrect !"});
    
                }
            }
            else{
                res.status(401).send({type : "This Username and Password is Incorrect !"});
            }}
            catch (error){
                     console.log(error);
            }
            
    }
}

export default AdminController;