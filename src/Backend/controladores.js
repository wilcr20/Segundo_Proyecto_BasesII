const { Pool, Client } = require('pg'); // Modulo requerido para definir
var logica = require('./logica');


exports.conectarServer = function(req, res) {
    logica.conectarServer(req, function(data) {
        res.send(data);
        res.end();
    });
};


exports.conectarNodo = function(req, res) {
    logica.conectarNodo(req, function(data) {
        res.send(data);
        res.end();
    });
};


exports.obtenerSchema = function(req, res) {
    logica.obtenerSchema(req, function(data) {
        res.send(data);
        res.end();
    });
};

exports.obtenerTablas = function(req, res) {
    logica.obtenerTablas(req, function(data) {
        res.send(data);
        res.end();
    });
};

exports.obtenerPrivilegiosTablas = function(req, res) {
    logica.obtenerPrivilegiosTablas(req, function(data) {
        res.send(data);
        res.end();
    });
};

exports.obtenerPrivilegiosColumnas = function(req, res) {
    logica.obtenerPrivilegiosColumnas(req, function(data) {
        res.send(data);
        res.end();
    });
};

exports.enviarQuery = function(req, res) {
    logica.enviarQuery(req, function(data) {
        res.send(data);
        res.end();
    });
};

exports.enviarQueryDistrib = function(req, res) {
    logica.enviarQueryDistrib(req, function(data) {
        res.send(data);
        console.log("Data recibida : ", data);
        res.end();
    });
};