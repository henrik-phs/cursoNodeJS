# Protocolo HTTP

O node possui um módulo padrão para poder criar um servidor e rodar a aplicação no navegador usando o protocolo http.

Para isso precisa importar o módulo http padrão do node:

```
var http = require('http');
```

Depois disso será necessário criar um servidor e informar a porta que será aberta para poder acessá-lo.

```
http.createServer(function (req, res) { 
    res.end("Ola mundo") 
}).listen(8080)
```