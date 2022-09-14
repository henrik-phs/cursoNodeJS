/**
 *  IMPORTANDO MÓDULOS
 */
const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const admin = require('./routes/admin')

const path = require('path') // MÓDULO RESPONSAVEL POR TRABALHAR COM DIRETÓRIOS
const mongose = require('mongoose')

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
    }
}))
app.set('view engine', 'handlebars')
app.set('views', '10-projeto-express/views')

/**
 * CONFIGURAÇÕES DO MONGOOSE
 * RESPONSÁVEL PELA CONEÇÃO COM BANCO DE DADOS MONGODB
 */
mongose.Promise = global.Promise
mongose.connect("mongodb://localhost/blogapp").then(() => {
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
app.use('/admin', admin)

/**
 * RESPONSÁVEL POR CRIAR UM SERVIDO NODE E RODAR O PROGRAMA NO NAVEGADOR
 */
app.listen(3000, () => {
    console.log('servidor rodando')
})