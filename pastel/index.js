const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());


const DB = {
    pastel: [
        {id: 6, name: 'Pastel 4 Queijos', price: 6},
        {id: 7, name: 'Pastel de Calabresa', price: 5},
        {id: 8, name: 'Pastel de Vento', price: 1},
        {id: 9, name: 'Pastel de Chocolate', price: 4},
        {id: 10, name: 'Pastel de Palmito', price: 2}
    ]
}

// retornar todos os pasteis.

app.get('/api/pasteis', (req, res) => {
    res.statusCode = 200;
    res.json(DB.pastel)
});

// retornar um pastel pelo ID.

app.get('/api/pastel/:id', (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.send('Opa não foi informado um id válido');
    } else {
        const idpast = parseInt(req.params.id);
        const past = DB.pastel.find(index => index.id === idpast);
        if (past !== undefined) {
            res.statusCode = 200;
            res.json(past);
        } else {
            res.sendStatus(404);
        }
    }
});

// registrar novo registro de pastel.

app.post('/api/pastel', (req, res) => {
    const { name, price } = req.body;
    DB.pastel.push({
        id: Math.floor(Math.random() * (100 - 90)) + 1,
        name,
        price
    });
    res.send('Novo pastel salvo com sucesso.');
});


// remover um registro de pastel.

app.delete('/api/pastel/:id', (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.sendStatus(400)
        res.json('Opa não foi informado um id válido');
    } else {
        const past = DB.pastel.findIndex(index => index.id === parseInt(id));
        if (past === -1) {
            res.sendStatus(404);
        } else {
            DB.pastel.splice(past, 1);
            res.sendStatus(200);
            res.send({ message: 'Pastel retirado do cardapio!' })
        }
    }
});

app.listen(3000, ()=> {
    console.log('app running in http://localhost:3000');
});