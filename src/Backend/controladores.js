const { Pool, Client } = require('pg'); // Modulo requerido para definir
let config = {};
var client;

exports.conectarServer = function(req, res) {
    console.log("\nRecibido : ", req.body);
    client = new Client({
        user: req.body.username,
        host: req.body.server,
        database: req.body.database,
        password: req.body.pasw,
        port: 5432,
    })
    client.connect()



    res.end(); // fin de peticion web

};

exports.conectarNodo = function(req, res) {
    // client.connect();
    console.log("entra a conectarNodooo----------------");
    client.query('SELECT * from persona', (err, res) => {
        console.log("\n\nResultadoS: \n", err, res.rows);
        //client.end();
    })

};