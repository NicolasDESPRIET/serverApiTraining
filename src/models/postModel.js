const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

let postSchema = new Schema({
    title: {
        type: String,
        required : "Le titre est requis"
    },
    content: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);