const mongoose = require('mongoose')

// CONFIGURANDO O MONGOOSE
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/teste', {
    useMongoClient: true
}).then(() => {
    console.log("DB Conectado...")
}).catch((err) => {
    console.log("Erro ao conectar: " + err)
})