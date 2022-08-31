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

/**
 * CRIAÇÃO DE MODELS COM NODE
 */

const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    conteudo: {
        type: Sequelize.TEXT
    }
});

// Postagem.sync({ force: true }) // CRIA A TABELA. APÓS CRIADO A TABELA, PODE COMENTAR ESSE LINHA DE COMANDO
// CRIAR UM REGISTRO
// Postagem.create({
//     titulo: 'Um título',
//     conteudo: 'lsfljs lkfjl kfjlksjfo oenocjo sfon ofhsdbr'
// })

const Usuario = sequelize.define('usuarios', {
        nome: {
            type: Sequelize.STRING
        },
        sobrenome: {
            type: Sequelize.STRING
        },
        idade: {
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.STRING
        }
    })
    // Usuario.sync({ force: true })
    // Usuario.create({
    //     nome: 'Pedro',
    //     sobrenome: 'Henrique',
    //     idade: 25,
    //     email: 'pedrohenriquedasilva100@gmail.com'
    // })