const BookController = require('../controllers/book.controller');

module.exports = app => {
    app.get('/api/books', JokeController.findAllBooks);
    app.put('/api/books/:id', JokeController.updateBook);
    app.post('/api/books', JokeController.createBook);
}