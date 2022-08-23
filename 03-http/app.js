var http = require('http'); // IMPORTA O MÓDULO HTTP PADRÃO DO NODE

http.createServer(function(req, res) { // FUNÇÃO QUE CRIA UM SERVIDOR NODE 
        res.end("Ola mundo") // EXIBE UMA MENSAGEM NA TELA PELO NAVEGADOR
    }).listen(8080) // INFORMA A PORTA QUE SERÁ USADA PARA ACESSAR O SERVIDOR

console.log("O servidor está rodando")