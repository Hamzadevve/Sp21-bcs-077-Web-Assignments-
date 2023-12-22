const express = require("express");
const fetchUser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const router = express.Router();

const { body, validationResult } = require("express-validator");


// ROUTE 1: FETCHING ALL NOTES

router.get('/getnotes' , fetchUser ,async (req , res)=>{
    try{
        const notes = await Notes.find({user: req.user.id});
        res.send(notes);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Error Occured");
    }
})

//ROUTE 2: CREATING A NOTE

router.post('/addnotes' , fetchUser , [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 })
] , async (req , res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    try{
        const notes = await Notes.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags
        })
        res.json(notes);
    }catch(error){
        res.status(401).send("Internal Error Occured");
    }
})


// ROUTE 3: UPDATE A NOTE

router.put('/updatenote/:id' , fetchUser , async(req , res)=>{
    const {title , description , tags} = req.body;

    try {        
        const newNote = {};
        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description;
        }
        if(tags){
            newNote.tags = tags;
        }
    
        let note = await Notes.findById(req.params.id);
        if(!note && note.user.toString() !== req.user.id){
            return res.status(404).send("404 Not Found");
        }
        note = await Notes.findByIdAndUpdate(req.params.id , {$set: newNote} , {new:true});
        res.send(note);
    } catch (error) {
        res.status(404).json({error: error.message});
    }

})


// ROUTE 4: DELETE A NOTE

router.delete('/deletenote/:id' , fetchUser , async(req , res)=>{

    try {
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("404 Not Found");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(404).send("404 Not Found");
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({Success: "Note has been deleted Sussessfully" , note: note});
    } catch (error) {
        res.status(404).json({error: error.message});
    }

})

module.exports = router;