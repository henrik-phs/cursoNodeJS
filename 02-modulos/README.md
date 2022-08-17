# Utilização de módulos com nodeJS

Com o node é possível separar partes do código em vários arquivos para poder reutilizá-los depois, os chamados módulos.

Para criar um módulo basta criar um arquivo com o código desejado e exportá-lo.

Ex.:

```
var somar = function(a, b) {
    return a + b
}

module.exports = somar;

```

Para usar esse código basta importá-lo na aplicação.

Ex.: 
```
var SomarFunc = require("./somar")
console.log(SomarFunc(56, 35))

```