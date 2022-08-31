const express = require('express');
const app = express();
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')

// CONEXÃO COM BANCO DE DADOS
const Sequelize = require('sequelize')

// CONFIGURAÇÃO DA TEMPLATE ENGINE
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', '07-handlebars/views')

// CONFIGURAÇÃO BODY PARSER - NECESSÁRIO PARA MANIPULAR DADOS DE FORMULÁRIO
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// CONEXÃO COM BANCO DE DADOS
const sequelize = new Sequelize('test', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
})

app.get('/cadastro', function(req, res) {
    res.render('form');
});

app.post("/cadastrar", (req, res) => {
    res.send("Titulo: " + req.body.titulo + "\nConteudo: " + req.body.conteudo)
})

app.listen(8080, function() {
    console.log("servidor rodando")
})