const mongoose = require('mongoose');
const express = require("express");
const app = express();
const cors = require('cors');
const movies = require('./routes/movies');

mongoose.connect('mongodb://localhost/movie-plot', {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to movie-plot DB");
}).catch(err => {
    console.error("Couldn't connect to MongoDB");
});

const port = process.env.PORT || 4000;
// smoke-api
app.get('/', (req, res) => {
    res.send("App is up")
});

app.use(express.json());
app.use(cors());

app.use('/api/movies', movies);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});