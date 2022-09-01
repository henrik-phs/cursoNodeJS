const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')

// CONFIGURA O HANDLEBARS
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', '08-postagens/views')

// MANIPULAÇÃO DOS DADOS DO FORMULÁRIO
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ROTAS

app.get('/enviar-post', (req, res) => {
    res.render('postagem')
})

app.post('/postar', (req, res) => {
    res.send("Titulo: " + req.body.titulo + "\nConteudo: " + req.body.conteudo)
})

app.listen(8080, () => {
    console.log('servidor rodando')
})