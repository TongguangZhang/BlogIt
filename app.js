const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// create app
const app = express();

// connect to mongodb
const configData = fs.readFileSync("config.json");
const config = JSON.parse(configData);
const dbURI = `mongodb+srv://${config.username}:${config.password}@learn-mongo.ukmrbkv.mongodb.net/blogspot?retryWrites=true&w=majority`;
mongoose
    .connect(dbURI)
    .then((result) => {
        console.log("Connected to Database");
        app.listen(3000);
        console.log(`Listening on port 3000`);
    })
    .catch((err) => console.log(err));

app.set("view engine", "ejs");

// middleware and static files
app.use(morgan("tiny")); // logs requests
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// routes
app.use(blogRoutes);

// 404 (default) must be at bottom - triggers for every request
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});
