/**
 *  IMPORTANDO MÓDULOS
 */

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

router.get('/cadastro', (req, res) => {
    res.render('usuarios/cadastro')
})

router.post('/cadastrar', (req, res) => {
    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'Nome inválido' })
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: 'Email inválido' })
    }

    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: 'Senha inválida' })
    }

    if (!req.body.senha2 || typeof req.body.senha2 == undefined || req.body.senha2 == null) {
        erros.push({ texto: 'Repetição de senha inválida' })
    }

    if (req.body.senha != req.body.senha2) {
        erros.push({ texto: 'As senhas são diferentes. Por favor corrija!' })
    }

    if (erros.length > 0) {
        res.render('usuarios/cadastro', { erros: erros, dados: req.body })
    } else {
        Usuario.findOne({ email: req.body.email }).then((usuario) => {
            if (usuario) {
                erros.push({ texto: 'Email já cadastrado' })
                res.render('usuarios/cadastro', { erros: erros, dados: req.body })
            } else {
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if (erro) {
                            req.flash('error_msg', 'Houve um erro durante o salvamento')
                            res.redirect('/usuarios/cadastro')
                        }

                        novoUsuario.senha = hash

                        novoUsuario.save().then(() => {
                            req.flash('success_msg', 'Usuário cadastrado com sucesso')
                            res.redirect('/')
                        }).catch((err) => {
                            req.flash('error_msg', 'Erro ao salvar categoria: ' + err)
                            res.redirect('/usuarios/cadastro')
                        })
                    })
                })
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro interno: ' + err)
            res.redirect('/')
        })
    }

})

module.exports = router