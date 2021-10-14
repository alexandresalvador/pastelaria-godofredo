const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());


const DB = {
    clientes: [
        {id: 1, name: 'Joao', email: 'jjoao@gmail.com', endereco: 'rua das flores, 108', bairro: 'Aventureiro', cidade: 'xanxere', estado: 'RJ', cep: 70000},
        {id: 2, name: 'Carlos', email: 'kkarlos@gmail.com', endereco: 'rua das bicicletas, 106', bairro: 'iririu', cidade: 'floripa', estado: 'SP', cep: 60000},
        {id: 3, name: 'Fernando', email: 'ffnando@gmail.com', endereco: 'rua dos principes, 120', bairro: 'centro', cidade: 'mafra', estado: 'SC', cep: 50000},
        {id: 4, name: 'Jair', email: 'jjaiir@gmail.com', endereco: 'rua da princesa, 102', bairro: 'anita garibaldi', cidade: 'joinville', estado: 'PR', cep: 40000},
        {id: 5, name: 'Célio', email: 'ycellio@gmail.com', endereco: 'rua da dança, 145', bairro: 'morro do meio', cidade: 'araquari', estado: 'AC', cep: 80000}        
    ]
}

// retornar todos os clientes.

app.get('/api/clientes', (req, res) => {
    res.statusCode = 200;
    res.json(DB.clientes)
});

// retornar um cliente com ID.

app.get('/api/clientes/:id', (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.send('Opa não foi informado um id válido');
    } else {
        const idCli = parseInt(req.params.id);
        const cli = DB.clientes.find(index => index.id === idCli);
        if (cli !== undefined) {
            res.statusCode = 200;
            res.json(cli);
        } else {
            res.sendStatus(404);
        }
    }
});

//salvar um novo registro de cliente.

app.post('/api/cliente', (req, res) => {
    const { name, email, endereco, bairro, cidade, estado, cep } = req.body;
    DB.clientes.push({
        id: Math.floor(Math.random()* (100 - 90)) + 1,
        name,
        email, 
        endereco, 
        bairro, 
        cidade, 
        estado, 
        cep
    });
    res.send('Novo cliente salvo com sucesso.');
});

// remover um registro de um cliente.

app.delete('/api/cliente/:id', (req, res) => {
    const id = req.params.id;
    if (isNaN(id)) {
        res.sendStatus(400)
        res.json('Opa não foi informado um id válido');
    } else {
        const cli = DB.clientes.findIndex(index => index.id === parseInt(id));
        if (cli === -1) {
            res.sendStatus(404);
        } else {
            DB.clientes.splice(cli, 1);
            res.sendStatus(200);
            res.send({ message: 'Cliente retirado do banco de dados!' })
        }
    }
});

app.listen(3000, ()=> {
    console.log('app running in http://localhost:3000');
});