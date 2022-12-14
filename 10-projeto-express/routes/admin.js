/**
 *  IMPORTANDO MÓDULOS
 */

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

require('../models/Categoria')
const Categoria = mongoose.model('categorias')

require('../models/Postagem')
const Postagem = mongoose.model('postagens')

const { admin } = require('../helpers/admin')

/**
 * ROTAS
 */
router.get('/', admin, (req, res) => {
    res.render('admin/index', { title: 'Admin' })
})


/**
 * Categorias
 */

router.get('/categorias', admin, (req, res) => {
    Categoria.find().sort({ date: 'desc' }).then((categorias) => {
        res.render('admin/categorias', { title: 'Categorias - Admin', categorias: categorias })
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar as categorias ' + err)
        res.redirect('/admin')
    })
})

router.get('/categorias/add', admin, (req, res) => {
    res.render('admin/add-categorias', { title: 'Adicionar uma categoria' })
})

router.post('/categorias/nova', admin, (req, res) => {
    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'Nome inválido' })
    }

    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: 'Slug inválido' })
    }

    if (req.body.nome.length < 2) {
        erros.push({ texto: 'Nome da categoria muito pequeno' })
    }

    if (erros.length > 0) {
        res.render('admin/add-categorias', { erros: erros })
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        new Categoria(novaCategoria).save().then(() => {
            req.flash('success_msg', 'Categoria salva com sucesso')
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao salvar categoria: ' + err)
            res.redirect('/admin')
        })
    }

})

router.get('/categorias/edit/:id', admin, (req, res) => {
    Categoria.findOne({ _id: req.params.id }).then((categoria) => {
        res.render('admin/edit-categorias', { title: 'Editar categoria ' + categoria.nome, categoria: categoria })
    }).catch((err) => {
        req.flash('error_msg', 'Essa categoria não existe ' + err)
        res.redirect('/admin/categorias')
    })
})

router.post('/categorias/edit', admin, (req, res) => {
    var erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'Nome inválido' })
    }

    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: 'Slug inválido' })
    }

    if (req.body.nome.length < 2) {
        erros.push({ texto: 'Nome da categoria muito pequeno' })
    }

    if (erros.length > 0) {
        res.render('admin/add-categorias', { erros: erros })
    } else {
        Categoria.findOne({ _id: req.body.id }).then((categoria) => {
            categoria.nome = req.body.nome
            categoria.slug = req.body.slug

            categoria.save().then(() => {
                req.flash('success_msg', 'Categoria editada com sucesso')
                res.redirect('/admin/categorias')
            }).catch((err) => {
                req.flash('error_msg', 'Erro ao salvar categoria ' + err)
                res.redirect('/admin/categorias')
            })
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao editar a categoria')
            res.redirect('/admin/categorias')
        })
    }
})

router.post('/categorias/deletar/:id', admin, (req, res) => {
    Categoria.remove({ _id: req.body.id }).then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso')
        res.redirect('/admin/categorias')
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao deletar categoria ' + err)
        res.redirect('/admin/categorias')
    })
})

/**
 * Postagens
 */

router.get('/postagens', admin, (req, res) => {
    Postagem.find().populate('categoria').sort({ data: 'desc' }).then((postagens) => {
        res.render('admin/postagens', { title: 'Postagens - Admin', postagens: postagens })
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar as postagens ' + err)
        res.redirect('/admin')
    })
})

router.get('/postagens/add', admin, (req, res) => {
    Categoria.find().sort({ date: 'desc' }).then((categorias) => {
        res.render('admin/add-postagens', { title: 'Adicionar uma postagem', categorias: categorias })
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar as categorias ' + err)
        res.redirect('/admin')
    })
})

router.post('/postagens/nova', admin, (req, res) => {
    var erros = []

    Postagem.findOne({ slug: req.body.slug }).then((postagens) => {
        console.log(postagens)
        if (postagens && typeof postagens != undefined && postagens != null) {
            erros.push({ texto: 'Esse slug já está sendo utilizado, preecha outro slug' })
            res.render('admin/add-postagens', { erros: erros, dados: req.body })
        } else {
            if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
                erros.push({ texto: 'Título inválido' })
            }

            if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
                erros.push({ texto: 'Slug inválido' })
            }

            if (!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null) {
                erros.push({ texto: 'Descrição inválida' })
            }

            if (!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null) {
                erros.push({ texto: 'Conteúdo inválido' })
            }

            if (req.body.categoria == 0) {
                erros.push({ text: 'Categoria inválida, registre uma categoria' })
            }

            if (req.body.titulo.length < 2) {
                erros.push({ texto: 'Nome da categoria muito pequeno' })
            }

            if (erros.length > 0) {
                res.render('admin/add-postagens', { erros: erros })
            } else {
                const novaPostagem = {
                    titulo: req.body.titulo,
                    slug: req.body.slug,
                    descricao: req.body.descricao,
                    conteudo: req.body.conteudo,
                    categoria: req.body.categoria,
                }

                new Postagem(novaPostagem).save().then(() => {
                    req.flash('success_msg', 'Postagem salva com sucesso')
                    res.redirect('/admin/postagens')
                }).catch((err) => {
                    req.flash('error_msg', 'Erro ao salvar postagem: ' + err)
                    res.redirect('/admin')
                })
            }
        }
    })
})

router.get('/postagens/edit/:id', admin, (req, res) => {
    Postagem.findOne({ _id: req.params.id }).then((postagem) => {
        Categoria.find().then((categorias) => {
            res.render('admin/edit-postagens', { title: 'Editar postagem ' + postagem.nome, postagem: postagem, categorias: categorias })
        }).catch((err) => {
            req.flash('error_msg', 'Nenhuma categoria encontrada ' + err)
            res.redirect('/admin/postagens')
        })

    }).catch((err) => {
        req.flash('error_msg', 'Essa postagem não existe ' + err)
        res.redirect('/admin/postagens')
    })
})

router.post('/postagens/edit', admin, (req, res) => {
    var erros = []

    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({ texto: 'Título inválido' })
    }

    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ texto: 'Slug inválido' })
    }

    if (!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null) {
        erros.push({ texto: 'Descrição inválida' })
    }

    if (!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null) {
        erros.push({ texto: 'Conteúdo inválido' })
    }

    if (req.body.titulo.length < 2) {
        erros.push({ texto: 'Nome da categoria muito pequeno' })
    }

    if (erros.length > 0) {
        res.render('admin/add-postagens', { erros: erros })
    } else {
        Postagem.findOne({ _id: req.body.id }).then((postagem) => {
            postagem.titulo = req.body.titulo
            postagem.slug = req.body.slug
            postagem.descricao = req.body.descricao
            postagem.conteudo = req.body.conteudo

            if (req.body.postagem != 0) {
                postagem.categoria = req.body.categoria
            }

            postagem.save().then(() => {
                req.flash('success_msg', 'Postagem editada com sucesso')
                res.redirect('/admin/postagens')
            }).catch((err) => {
                req.flash('error_msg', 'Erro ao salvar postagem ' + err)
                res.redirect('/admin/postagens')
            })
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao editar a postagem ' + err)
            res.redirect('/admin/postagens')
        })
    }

})

router.get('/postagens/deletar/:id', admin, (req, res) => {
    Postagem.remove({ _id: req.params.id }).then(() => {
        req.flash('success_msg', 'Postagem deletada com sucesso')
        res.redirect('/admin/postagens')
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao deletar postagem ' + err)
        res.redirect('/admin/postagens')
    })
})

module.exports = router