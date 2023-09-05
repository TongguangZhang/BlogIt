const express = require("express");
const morgan = require("morgan");

// create app
const app = express();

app.set("view engine", "ejs");

// listen for requests
app.listen(3000);

// middleware and static files
app.use(morgan("tiny")); // logs requests
app.use(express.static("public"));

// get requests
app.get("/", (req, res) => {
    const blogs = [
        { title: "blog1", snippet: "Lorem ipsum dolor sit amet" },
        { title: "blog2", snippet: "Lorem ipsum dolor sit amet" },
        { title: "blog3", snippet: "Lorem ipsum dolor sit amet" },
    ];
    res.render("index", { title: "Home", blogs: blogs });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

// new blog
app.get("/blogs/create", (req, res) => {
    res.render("create", { title: "Create" });
});

// 404 (default) must be at bottom - triggers for every request
app.use((req, res) => {
    res.status(404).render("404", { title: "404" });
});
