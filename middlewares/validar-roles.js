
const { response } = require('express');

const esAdminRole = ( req, res = response, next ) => {
    


    next();
}


module.exports = {
    esAdminRole
}