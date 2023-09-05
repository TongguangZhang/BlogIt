const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// homepage, redirects to blogs
router.get("/", (req, res) => {
    res.redirect("/blogs");
});

// about page
router.get("/about", blogController.blog_about_get);

// blogs
router.get("/blogs", blogController.blog_index);

// new blog form
router.get("/blogs/create", blogController.blog_create_get);

// single blog details
router.get("/blogs/:id", blogController.blog_details);

// creating new blog
router.post("/blogs", blogController.blog_post);

// deleting blog
router.delete("/blogs/:id", blogController.blog_delete);

module.exports = router;
