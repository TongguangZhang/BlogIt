const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

// create app
const app = express();

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

// routes
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

app.get("/blogs", (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("index", { title: "All Blogs", blogs: result });
        })
        .catch((err) => console.log(err));
});

// new blog
app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create" });
});

// 404 (default) must be at bottom - triggers for every request
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});
