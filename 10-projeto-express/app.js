// IMPORTANDO MÓDULOS
const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')

const app = express()
const admin = require('./routes/admin')

const path = require('path')
    // const mongose = require('mongoose')

// CONFIGURAÇÕES
// BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// HANDLEBARS
app.engine('handlebars', engine({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))
app.set('view engine', 'handlebars')
app.set('views', '10-projeto-express/views')

// PUBLIC
app.use(express.static(path.join(__dirname, "public")))

// ROTAS
app.use('/admin', admin)

// OUTROS
app.listen(3000, () => {
    console.log('servidor rodando')
})