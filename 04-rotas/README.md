# Criação de rotas com express

O express permite a criação de rotas, que é uma forma de definir as urls e os caminhos da aplicação.

Para utilizar o express é necessário fazer a instalação do mesmo via terminal:
```
npm install express --save
```

Depois de instalado será necessário importar o módulo express:

```
const express = require("express");
const app = express();
```

Depois disso será necessário criar as rotas permitidas da sua aplicação.

```
// req (recebe dados de uma requisição)
// res (recebe dados de uma resposta)
app.get("/", function(req, res) {
    res.send("Bem vindo");
});
```

Por fim informar a porta do servidor:
```
app.listen(8080);
OU
app.listen(8080, function() {
    console.log("Servidor rodando");
});
```

# Definição de parâmetros

Para criar uma rota com parâmetros, basta adicionar '/:nome_do_parametro':
```
app.get("/ola/:nome", function(req, res) {
    res.send("Ola" + req.params.nome);
});
```