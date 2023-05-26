import express from 'express'
import Category from './db.js';

const app = express();

app.use(express.json());

const categories = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Sci-Fi' },
]
const PORT = 8082;

app.get('/categories', (req, res) => {

    // Category.findAll().then((categories) => {
    //     res.send(categories);
    // });
    res.send(categories);
});

app.post('/categories', (req, res) => {
    const category = req.body;
    categories.push(category);
    res.send(categories);
});

app.get('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const category = categories.find((category) => category.id === id);

    if(category) {
        res.send(category);
    } else {
        res.status(404).send('Category not found');
    }
});

app.put('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const category = req.body;
    const index = categories.findIndex((category) => category.id === id);
    categories[index] = category;
    res.send(categories);
});

app.delete('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    categories = categories.filter((category) => category.id !== id);
    res.send(categories);
});
    
app.listen(
    PORT,
  () => console.log(`Categories Service started at http://localhost:${PORT}`),
);