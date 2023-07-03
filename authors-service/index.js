import express from 'express';
import axios from 'axios';
import Authors from './db.js';

const app = express();
app.use(express.json());

const authors = [
    { id: 1, firstName: 'Michael', lastName: 'Crichton' },
    { id: 2, name: 'Stephen', lastName: 'King' },
    { id: 3, name: 'George', lastName: 'R. Martin' },
]
const PORT = 8080;
const PORT_BOOKS = 8081;

app.get('/authors', (req, res) => {
    Authors.findAll()
        .then((authors) => {
            res.send(authors);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Some error occurred while retrieving authors.", });
        }
    );  
});

app.post('/authors', (req, res) => {
    const author = req.body;
    Authors.create(author)
        .then((author) => {
            res.send(author);
        })
        .catch((err) => {
            res.status(500).send({ message: err.message || "Some error occurred while creating the author." });
        }
    );
});

app.get('/authors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const author = Authors.findAll({ where: { idAuthor: id }})
    .then((author) => {
        res.send(author);
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || `Some error occurred while retrieving author ${id}.` });
    });
});

app.put('/authors/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const author = Authors.update(req.body, { where: { idAuthor: id }})
    .then((author) => {
        res.send(author);
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || `Some error occurred while updating author ${id}.` });
    });
});

app.delete('/authors/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await Authors.destroy({ where: { idAuthor: id }});
        await axios.get(`http://localhost:${PORT_BOOKS}/books/eventBook/${id}`);
        res.send({ message: `Author ${id} deleted successfully.` });
    } catch (err) {
        res.status(500).send({ message: err.message || `Some error occurred while deleting author ${id}.` });
    }
});
    
app.listen(
    PORT,
  () => console.log(`Authors Service started at http://localhost:${PORT}`),
);