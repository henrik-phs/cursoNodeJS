const mongoose = require('mongoose')

// CONFIGURANDO O MONGOOSE
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/teste').then(() => {
    console.log("DB Conectado...")
}).catch((err) => {
    console.log("Erro ao conectar: " + err)
})

// MODELS
// DEFININDO O MODEL
const UserSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    sobrenome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    idade: {
        type: Number
    },
    pais: {
        type: String
    }
})

// DEFININDO A COLECTION
mongoose.model('usuarios', UserSchema)

// INSERINDO DADOS
const Usuario = mongoose.model('usuarios')
new Usuario({
    nome: 'John',
    sobrenome: 'Doe',
    email: 'john@doe.com',
    idade: 20,
    pais: 'EUA'
}).save().then(() => {
    console.log('Usuário criado com sucesso')
}).catch((err) => {
    console.log('Eroo ao inserir: ' + err)
})