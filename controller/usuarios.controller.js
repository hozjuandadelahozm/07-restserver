
const { response } =  require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario.model');

const usuariosGet = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado : true }

    // const usuarios = await Usuario.find( query )
    //     .limit( Number(limite) )
    //     .skip( Number(desde) )

    // const total = await Usuario.countDocuments( query );

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .limit(Number(limite))
            .skip(Number(desde))
    ]);

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validat contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.status(500).json(usuario)
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

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );

    res.json({
        usuario
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