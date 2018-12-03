const express = require('express');
const router = express.Router();

const { Movie } = require('../models/movie');

router.get('/', async (req, res) => {
    const { title } = req.query;
    const searchTerm = new RegExp(title, "i");

    try {
        const totalCount = await Movie.find({ Title: searchTerm }).countDocuments();
        const movies = await Movie.find({ Title: searchTerm }).
            limit(500).
            select({
                "Title": 1,
                "Release Year": 1,
                "Origin/Ethnicity": 1,
                "Director": 1,
                "Wiki Page": 1,
                "Genre": 1
            });

        const result = {
            totalCount: totalCount,
            movies: movies
        };
        res.send(result);
    } catch (err) {
        res.status(500).send("Internal server error");
    }

});

router.post('/', async (req, res) => {
    const movieObject = {
        "Title": req.body.title,
        "Release Year": req.body.releaseYear
    }

    const movie = new Movie(movieObject);
    await movie.save();
    res.send(movie);
});

module.exports = router;