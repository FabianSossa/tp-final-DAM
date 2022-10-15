var express = require('express');
var routerDispositivo = express.Router();
var connection = require('../../mysql');

//Devuelve un array de dispositivos
routerDispositivo.get('/', function(req, res) {
    connection.query('Select dispositivoId, nombre, ubicacion, electrovalvulaId from Dispositivos', function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

routerDispositivo.get('/:id', function(req, res) {
    let idDispo = req.params.id;
    connection.query('Select dispositivoId, nombre, ubicacion, electrovalvulaId from Dispositivos where dispositivoId = ?',[idDispo], function(err, result, fields) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(result);
    });
});

module.exports = routerDispositivo;