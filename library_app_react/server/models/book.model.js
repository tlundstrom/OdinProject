const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Book title is required"],
        },
        author: {
            type: String,
            required: [true, "Author is required."],
        },
        pages: {
            type: Number,
            required: [true, "Number of pages are required,"],
        },
        read: {
            type: Boolean,
            required: false,
        },
    },
    {timestamps: true}
);

BookSchema.virtual("confirm")
.get(() => this._confirm)
.set((value) => this._confirm = value);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;