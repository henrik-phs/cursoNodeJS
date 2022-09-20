/**
 * Módulo com funções gerais
 */

/**
 * Função para retornar a data formatada
 * 
 * @param {Date} data 
 * @returns String
 */

const formataData = function(data) {
    var meses = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var dt = new Date(data)

    return dt.getDate() + '/' + meses[dt.getMonth()] + '/' + dt.getFullYear()
}

module.exports = {
    formataData: formataData
}