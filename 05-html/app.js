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