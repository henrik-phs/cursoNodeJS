/**
 * NESTE MÓDULO É FEITO A CONEXÃO COM BANCO DE DADOS MYSQL
 */

// PRIMEIRO É FEITO A IMPORTAÇÃO DO MÓDULO SEQUELIZE
const Sequelize = require('sequelize')

// DEPOIS INFORMAMOS OS DADOS DE CONEXÃO DO BANCO DE DADOS
const sequelize = new Sequelize('test', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
})

// POR FIM VERIFICAMOS SE A CONEXÃO FOI FEITA E EXIBIMOS UMA MENSAGEM
sequelize.authenticate().then(function() {
    console.log("conectado com sucesso")
}).catch(function(erro) {
    console.log("falla ao se conectar: " + erro)
})