const express = require('express');
const app = express();
const handlebars = require('express-handlebars')

// CONEXÃO COM BANCO DE DADOS
const Sequelize = require('sequelize')

// CONFIGURAÇÃO DA TEMPLATE ENGINE
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// CONEXÃO COM BANCO DE DADOS
const sequelize = new Sequelize('test', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
})

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + "/html/index.html");
// });

// app.get("/sobre", (req, res) => {
//     res.sendFile(__dirname + "/html/sobre.html")
// })

app.listen(8080, function() {
    console.log("servidor rodando")
})