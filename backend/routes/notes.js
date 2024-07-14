const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
router.get('/fetchnotes',fetchUser, async(req,res)=>{
    const notes = await Notes.find({user: req.user.id});
    // res.send("Hello");
    res.json(notes)
});



// Route 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote',fetchUser,     [
    // Validation rules for email, password, and name
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("content", "description should be minimum of 6 characters").isLength({ min: 6 }),
],
async (req, res) => {
    try {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            console.error("Validation errors:", result.array());
            return res.status(400).json({ errors: result.array() });
        }
        const{title, content , category} =  req.body;
        const note =  new Notes({
            title, content, category, user: req.user.id
        })
        const Savenote = await note.save();
        res.json(Savenote)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});
//Route 3 Updte notes
// Route 3: Update a Note using: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const newNote = {};

        if (title) newNote.title = title;
        if (content) newNote.content = content;
        if (category) newNote.category = category;

        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized" });
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});
//Route 4 delete notes
// Route 4: Delete a Note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ error: "Not authorized" });
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ success: "Note has been deleted", note: note });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = router;