const http = require('http');
const { Client } = require('pg')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const config = require('./connection');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE, GET, POST, PUT");
    next();
});



//app.get('/obtenerDB', ctrl.obtenerDb);

app.get('/w', function(req, res) {
    config.conecta();
    res.send("YEP");

});


app.get('/', function(req, res) {
    res.send('Servidor de NodeJs para proyecto Bases de datos II!');
});

app.listen(3000, function() {
    console.log('Servidor corriendo en puerto 3000!! ;v');
});