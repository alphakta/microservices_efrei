import express from 'express'
import Category from './db.js';

const app = express();

app.use(express.json());

const PORT = 8082;

app.get('/categories', (req, res) => {
    Category.findAll()
        .then((categories) => {
            res.send(categories);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories.",
            });
        }
    );  
});

app.post('/categories', (req, res) => {
    const category = req.body;
    Category.create(category)
        .then((category) => {
            res.send(category);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the category.",
            });
        }
    );
});

app.get('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const category = Category.findAll({ where: { idCategory: id }})
    .then((category) => {
        res.send(category);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || `Some error occurred while retrieving category ${id}.`,
        });
    });
});

app.put('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const category = Category.update(req.body, { where: { idCategory: id }})
    .then((category) => {
        res.send(category);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || `Some error occurred while updating category ${id}.`,
        });
    });
});

app.delete('/categories/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const category = Category.destroy({ where: { idCategory: id }})
    .then((category) => {
        res.send(category);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || `Some error occurred while deleting category ${id}.`,
        });
    });
});
    
app.listen(
    PORT,
  () => console.log(`Categories Service started at http://localhost:${PORT}`),
);