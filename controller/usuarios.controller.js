
const { response } =  require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.model');

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

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo existente
    const existeEmail = await Usuario.findOne({ correo })
    if ( existeEmail ) {
        return res.status(400).json({
            msg: 'Ese correo ya esta registrado'
        });
    }


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt )

    // Guardar en DB
    await usuario.save();

    res.status(201).json({
        usuario
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