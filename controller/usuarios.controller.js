
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

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { password, google, correo, ...resto } = req.body;

    // TODO validat contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.status(500).json({
        msg: 'put API - Controlador',
        usuario
    })
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

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