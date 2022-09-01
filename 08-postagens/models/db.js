const Sequelize = require('sequelize')

// CONECTA AO BANCO DE DADOS
const sequelize = new Sequelize('node_app', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}