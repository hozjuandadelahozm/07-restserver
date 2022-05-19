const { Schema, model } = require('mongoose');

const RoleShema = Schema({
    rol: {
        type: 'string',
        required: [ true, 'El rol es obligatorio' ]
    }
});

module.exports = model( 'Role', RoleShema );