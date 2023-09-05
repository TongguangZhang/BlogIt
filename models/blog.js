const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blogschema = new schema(
    {
        title: {
            type: String,
            required: true,
        },
        snippet: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogschema);

module.exports = Blog;
