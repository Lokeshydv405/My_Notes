const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        default: "General"
    },
    
});

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;