const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// blogs
router.get("/", blogController.blog_index);

// new blog form
router.get("/create", blogController.blog_create_get);

// single blog details
router.get("/:id", blogController.blog_details);

// creating new blog
router.post("/", blogController.blog_post);

// deleting blog
router.delete("/:id", blogController.blog_delete);

module.exports = router;
