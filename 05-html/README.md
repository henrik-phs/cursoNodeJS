# Exibindo HTML

Nesse módulo é possível fazer a exibição de arquivos html com a função *sendFile()*.

Para isso basta criar o arquivo html e no arquivo de rotas ao invés de utilizar a função *send()*, utilizar a função *sendFile()*.

Ex.:
```
const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/html/index.html");
});

app.get("/sobre", (req, res) => {
    res.sendFile(__dirname + "/html/sobre.html")
})

app.listen(8080, function() {
    console.log("servidor rodando")
})
```