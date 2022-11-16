import EventModal from '../models/event.js';

class EventController {

    static getAllEvent = async (req,res) => {
        try {
            const result = await EventModal.find();
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static getSingleEvent = async (req, res) => {
        try {
            const result = await EventModal.findById(req.params.id);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    }

    static createEvent =  async (req, res) =>{
        try {
           
            const doc = new EventModal({
                date:req.body.date,
                place: req.body.place,
                address:req.body.address,
                time:req.body.time
            });
            const result = await doc.save();
            res.status(201).send(result);
        } catch (error) {
            console.log(error);
        }
    }
   
    static updateEventById = async (req, res) => {
        try{
          
            await EventModal.findByIdAndUpdate(req.params.id, {
                date:req.body.date,
                place: req.body.place,
                address:req.body.address,
                time:req.body.time
            });
            res.send({success:true});    
        } catch (error) {
            console.log(error);
        }
    }

    static deleteEventById = async (req, res) => {
        try {
            EventModal.findByIdAndDelete(req.params.id, (err, result)=>{
            res.send({success:true});
        });
        } catch (error) {
            console.log(error);
        }
    }

}        

export default EventController;        