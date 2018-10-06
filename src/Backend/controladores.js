const { Pool, Client } = require('pg'); // Modulo requerido para definir
var logica = require('./logica');

exports.conectarServer = function(req, res) {
    logica.conectarServer(req, function(data) {
        res.send(data);
        console.log("Data recibida : ", data);
        res.end();
    });
};


exports.conectarNodo = function(req, res) {


    logica.conectarNodo(req, function(data) {
        res.send(data);
        console.log("Data recibida : ", data);
        res.end();
    });



};