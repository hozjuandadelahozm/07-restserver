
const { response } =  require('express')

const usuariosGet = (req, res = response) => {

    const { q, nombre='No name', apiKey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apiKey,
        page,
        limit
    })
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.status(500).json({
        msg: 'put API - Controlador',
        id
    })
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API - Controlador',
        nombre,
        edad
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador'
    })
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}