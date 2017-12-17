const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    // "subreddit": req.params.sub,
    // "title": title,
    // "link": link
    subreddit: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;