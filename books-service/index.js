import express from 'express';
import axios from 'axios';
import Books from './db.js';

const app = express();

app.use(express.json());

const PORT = 8081;
const PORT_AUTHORS = 8080;
const PORT_CATEGORIES = 8082;

app.get('/books', (req, res) => {
    Books.findAll()
        .then((books) => {
            res.send(books);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books.",
            });
        }
    );
});

app.post('/books', (req, res) => {
    const books = req.body;
    Books.create(books)
        .then((books) => {
            res.send(books);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the book.",
            });
        }
    );
});

app.get('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const book = Books.findAll({ where: { idBook: id }})
    .then(async (book) => {
        const authorResponse = await axios.get(`http://localhost:${PORT_AUTHORS}/authors/${book.authorId}`);
        const categoryResponse = await axios.get(`http://localhost:${PORT_CATEGORIES}/categories/${book.categoryId}`);
        book.authorId = authorResponse.data;
        book.categoryId = categoryResponse.data;
        res.send(book);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || `Some error occurred while retrieving book ${id}.`,
        });
    });
});

app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = Books.update(req.body, { where: { idBook: id }})
    .then((book) => {
        res.send(book);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || `Some error occurred while updating book ${id}.`,
        });
    });
});

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = Books.destroy({ where: { idBook: id }})
    .then((book) => {
        res.send(book);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || `Some error occurred while deleting book ${id}.`,
        });
    });
});
    
app.listen(
    PORT,
  () => console.log(`Books Service started at http://localhost:${PORT}`),
);