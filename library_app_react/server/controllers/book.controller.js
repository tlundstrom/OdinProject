const Book = require('../models/book.model');

module.exports.findAllBooks = (req, res) => {
    Joke.find({})
        .then((allBooks) => {
            
            res.json({ books: allBooks })
        })
        .catch((err) => {
            
            res.json({ message: 'Something went wrong', error: err })
        });
}
module.exports.createBook = (req, res) => {
    Book.create(req.body)
        .then(newlyCreatedBook => {
            return res.json({ book: newlyCreatedBook })
        })
        .catch((err) => {
            return res.json({ message: 'Something went wrong', error: err })
        });
}

module.exports.updateBook = (req, res) => {
    Book.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedBook => {
            return res.json({ book: updatedBook })
        })
        .catch((err) => {
            return res.json({ message: 'Something went wrong', error: err })
        });
}