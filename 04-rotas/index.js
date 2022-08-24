const express = require("express"); // IMPORTA O EXPRESS
const app = express(); // ATRIBUI O EXPRESS A UMA CONSTANTE

// CRIAÇÃO DAS ROTAS DA APLICAÇÃO
app.get("/", function(req, res) {
    res.send("Bem vindo");
});

app.get("/sobre", function(req, res) {
    res.send("Página sobre");
});

app.get("/blog", function(req, res) {
    res.send("Página blog");
});

app.listen(8080, function() {
    console.log("Servidor rodando");
});
// INFORMA A PORTA QUE SERÁ USADA PARA ACESSAR O SERVIDOR
// DEVE SER A ÚLTIMA LINHA DO PROGRAMA
// PARA ACESSAR: localhost:8080