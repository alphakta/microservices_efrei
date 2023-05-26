import express from 'express';

const app = express();

app.use(express.json());

const authors = [
    { id: 1, firstName: 'Michael', lastName: 'Crichton' },
    { id: 2, name: 'Stephen', lastName: 'King' },
    { id: 3, name: 'George', lastName: 'R. Martin' },
]
const PORT = 8080;

app.get('/authors', (req, res) => {
    res.send(authors);
});

app.post('/authors', (req, res) => {
    const author = req.body;
    authors.push(author);
    res.send(authors);
});

app.get('/authors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const author = authors.find((author) => author.id === id);
    
    if(author) {
        res.send(author);
    } else {
        res.status(404).send('Author not found');
    }
});

app.put('/authors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const author = req.body;
    const index = authors.findIndex((author) => author.id === id);
    authors[index] = author;
    res.send(authors);
});

app.delete('/authors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    authors = authors.filter((author) => author.id !== id);
    res.send(authors);
});
    
app.listen(
    PORT,
  () => console.log(`Authors Service started at http://localhost:${PORT}`),
);