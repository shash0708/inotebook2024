const express = require('express');
const router = express.Router();
const {body,validationResult} =require('express-validator');
const fetchuser = require('../middleware/fetchuser.js');
const Notes = require('../models/Notes');
//Route 1
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
   try{
    const notes = await Notes.find({user:req.user.id})

    res.json(notes)
   }
   catch(error){
    console.log("Error in Fetching the notes : ", error);
     res.status(500).send("Internal Server Error");   
}
})

//Route 2
router.post('/addnotes',fetchuser,[
        body("title",'Enter a valid title').isLength({min:3}),
        body("description",'Description must be atleast 5 characters').isLength({min:5})
],async(req,res)=>{
    try{
    const {title,description,tag} = req.body;
    //if there are eroors then return bad request and th errors    
    const errors = validationResult(req);
        if(!errors.isEmpty()){return res.status(400).json({errors:errors.array()});}

       const note = new Notes({
        title,description,tag,user:req.user.id
       })
      const savedNote = await note.save();
       res.json(savedNote);
    }catch(error){
        console.log("Error in Fetching the notes : ", error);
     res.status(500).send("Internal Server Error");   

    }
 })


 //ROute -3

//Route 2
router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
     const {title,description,tag}= req.body;
     const newNote = {};
     if(title){newNote.title= title};
     if(description){newNote.description=description};
     if(tag){newNote.tag = tag};

     let note = await Notes.findById(req.params.id);
     if(!note) return res.status(404).send('The Note with given ID was not found');
     if(note.user.toString() !== req.user.id) return res.status(401).send("Not allowed");
    
     note = await Notes.findByIdAndUpdate(req.params.id,{$set :newNote},{new:true})
    res.json({note});
})


router.delete('/deletenotes/:id',fetchuser,async (req,res)=>{
  try{
    let note = await Notes.findById(req.params.id);
    if(!note) return res.status(404).send('The Note with given ID was not found');
    if(note.user.toString() !== req.user.id) return res.status(401).send("Not allowed");
   
    note = await Notes.findByIdAndDelete(req.params.id)
   res.json({"Success":"NOtes has been deleted",note});
  }catch(error){
    console.error(error.message);
    res.status(500).send('Server Error')
  }

})
module.exports = router;