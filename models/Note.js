const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    // should only need a body
    body: {
        type: String,
        required: true
    }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;