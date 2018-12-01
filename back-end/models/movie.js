const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', true);

const movieSchema = new mongoose.Schema({
    "Release Year": {
        type: Number,
        default: 2019
    },
    "Title": {
        type: String,
        required: "true",
        trim: true
    },
    "Origin/Ethnicity": {
        type: String,
        trim: true,
        default: "Bollywood"
    },
    "Director": {
        type: String,
        trim: true,
        default: "unknown"
    },
    "Cast": {
        type: String,
        trim: true,
        default: "unknown"
    },
    "Genre": {
        type: String,
        trim: true,
        default: "new"
    },
    "Wiki Page": {
        type: String,
        trim: true,
        default: "http:.//www.wikipedia.org"
    },
    "Plot": {
        type: String,
        trim: true,
        default: "A generic plot"
    }
});

const Movie = mongoose.model("Movie", movieSchema);

exports.Movie = Movie;