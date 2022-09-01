const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')

// CONFIGURA O HANDLEBARS
app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))
app.set('view engine', 'handlebars')
app.set('views', '08-postagens/views')

// MANIPULAÇÃO DOS DADOS DO FORMULÁRIO
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ROTAS
app.get('/', (req, res) => {
    Post.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then((posts) => {
        res.render('home', { posts: posts })
    })

})

app.get('/enviar-post', (req, res) => {
    res.render('postagem')
})

app.post('/postar', (req, res) => {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(() => {
        res.redirect('/')
    }).catch((erro) => {
        res.send('Erro ao enviar dados: ' + erro)
    })
})

app.get('/excluir/:id', (req, res) => {
    Post.destroy({ where: { 'id': req.params.id } }).then(() => {
        res.send('Postagem deletada com sucesso')
    }).catch((erro) => {
        res.send('Erro ao deletar postagem: ' + erro)
    })
})

app.listen(8080, () => {
    console.log('servidor rodando')
})