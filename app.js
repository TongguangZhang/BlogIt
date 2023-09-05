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
app.use(express.urlencoded({ extended: true }));

// routes

// homepage, redirects to blogs
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

// about page
app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

// blogs
app.get("/blogs", (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("index", { title: "All Blogs", blogs: result });
        })
        .catch((err) => console.log(err));
});

// new blog form
app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create" });
});

// single blog details
app.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render("details", { blog: result, title: "Blog Details" });
        })
        .catch((err) => console.log(err));
});

// creating new blog
app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect("/blogs");
        })
        .catch((err) => console.log(err));
});

// deleting blog
app.delete("/blogs/:id", (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/blogs" });
        })
        .catch((err) => console.log(err));
});

// 404 (default) must be at bottom - triggers for every request
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});
