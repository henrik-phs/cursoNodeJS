/**
 *  IMPORTANDO MÓDULOS
 */
const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const admin = require('./routes/admin')
const usuario = require('./routes/usuario')

const path = require('path') // MÓDULO RESPONSAVEL POR TRABALHAR COM DIRETÓRIOS
const mongoose = require('mongoose')

const session = require('express-session')
const flash = require('connect-flash')

require('./models/Postagem')
const Postagem = mongoose.model('postagens')

require('./models/Categoria')
const Categoria = mongoose.model('categorias')

// const functions = require('./public/js/functions')
// console.log(functions.formataData('2022-09-20T02:31:03.290+00:00'))

// MÓDULO PARA FORMATAÇÃO DE DATAS
const moment = require('moment');

const passport = require('passport')
require('./config/auth')(passport)

/**
 * CONFIGURAÇÕES DE SESSÃO
 */

app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}))

/**
 * INICIALIZAR O AUTENTICADOR PASSPORT
 */

app.use(passport.initialize())
app.use(passport.session())

// FLASH MESSAGES
app.use(flash())

/**
 * CONFIGURAÇÕES DE MIDLEWARE
 * DEFINIÇÃO DE VARIÁVEIS GLOBAIS
 */

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash('error')
    next()
})

/**
 * CONFIGURAÇÕES
 * BODY PARSER - TRABALHA COM DADOS VINDOS DE FORMULÁRIO E TRANSFORMA EM JSON
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * HANDLEBARS
 * TEMPLATE ENGINE
 */
app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}))
app.set('view engine', 'handlebars')
app.set('views', '10-projeto-express/views')

/**
 * CONFIGURAÇÕES DO MONGOOSE
 * RESPONSÁVEL PELA CONEÇÃO COM BANCO DE DADOS MONGODB
 */
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/blogapp").then(() => {
    console.log("conectado ao mongo")
}).catch((err) => {
    console.log("erro ao conectar: " + err)
})

/**
 * PUBLIC
 * INFORMA AO EXPRESS QUE A PASTA PUBLIC É A PASTA DE ARQUIVOS ESTÁTICOS
 */
app.use(express.static(path.join(__dirname, "public")))

/**
 * ROTAS
 */
app.get('/', (req, res) => {
    Postagem.find().populate('categoria').sort({ data: 'desc' }).then((postagens, functions) => {
        res.render('index', { title: 'Blog do NodeJs', postagens: postagens, functions: functions })
    })
})

app.get('/postagem/:slug', (req, res) => {
    Postagem.findOne({ slug: req.params.slug }).populate('categoria').then((postagem) => {
        if (postagem) {
            res.render('postagem', { title: postagem.titulo, postagem: postagem })
        } else {
            req.flash('error_msg', 'Esta postagem não existe')
            res.redirect('/')
        }
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno')
        res.redirect('/')
    })
})

app.get('/categorias', (req, res) => {
    Categoria.find().sort({ nome: 'desc' }).then((categorias) => {
        res.render('categorias', { title: 'Categorias - Blog do NodeJs', categorias: categorias })
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno ao listar as categorias')
        res.redirect('/')
    })
})

app.get('/categorias/:slug', (req, res) => {
    Categoria.findOne({ slug: req.params.slug }).then((categoria) => {
        if (categoria) {
            Postagem.find({ categoria: categoria._id }).sort({ data: 'desc' }).then((postagens) => {
                res.render('posts-categoria', { title: categoria.nome + ' - Categoria', categoria: categoria, postagens: postagens })
            }).catch((err) => {
                req.flash('error_msg', 'Houve um erro interno ao listar as postagens')
                res.redirect('/')
            })
        } else {
            req.flash('error_msg', 'Essa categoria não existe')
            res.redirect('/')
        }
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro interno ao listar as categorias')
        res.redirect('/')
    })
})

app.use('/admin', admin)
app.use('/usuarios', usuario)

/**
 * RESPONSÁVEL POR CRIAR UM SERVIDO NODE E RODAR O PROGRAMA NO NAVEGADOR
 */
app.listen(3000, () => {
    console.log('servidor rodando')
})