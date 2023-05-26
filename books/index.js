import express from 'express';
import axios from 'axios';

const app = express();

app.use(express.json());

const books = [
    { id: 1, title: 'Jurassic Park 1', authorId: 1, categoryId: 1 },
    { id: 2, title: 'Jurassic Park 2', authorId: 2, categoryId: 2 },
    { id: 3, title: 'Jurassic Park 3', authorId: 3, categoryId: 3 },
];
const PORT = 8081;
const PORT_AUTHORS = 8080;
const PORT_CATEGORIES = 8082;

app.get('/books', (req, res) => {
    res.send(books);
});

app.post('/books', (req, res) => {
    const book = req.body;
    books.push(book);
    res.send(books);
});

app.get('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id);

    if(book) {  
        try {
            const authorResponse = await axios.get(`http://localhost:${PORT_AUTHORS}/authors/${book.authorId}`);
            const categoryResponse = await axios.get(`http://localhost:${PORT_CATEGORIES}/categories/${book.categoryId}`);
            book.authorId = authorResponse.data;
            book.categoryId = categoryResponse.data;
            res.send(book);
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(404).send('Book not found');
    }
});

app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = req.body;
    const index = books.findIndex((book) => book.id === id);
    books[index] = book;
    res.send(books);
});

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    books = books.filter((book) => book.id !== id);
    res.send(books);
});
    
app.listen(
    PORT,
  () => console.log(`Books Service started at http://localhost:${PORT}`),
);