var client; // guarda el cliente actual;
const { Pool, Client } = require('pg'); // Modulo requerido para definir



exports.conectarServer = function conectarServer(data, callback) {
    //console.log("data.body recibido: ", data.body);
    client = new Client({
        user: data.body.username,
        host: data.body.server,
        database: data.body.database,
        password: data.body.pasw,
        port: 5432,
    })

    client.connect((err) => {
        if (err) {
            console.log("Error de Conexion!!");
            callback(false);
        } else {
            console.log("Conectado a base de dato");
            creaDbLink();
            callback(true);
        }
    })
}


creaDbLink = function() {
    client.query("create extension dblink;", (err, res) => {
        console.log("EROR: ", err);
        if (err) {
            console.log("Error de dblink.");
            // callback(false);

        } else {
            console.log("\n\nResultadoS: \n", res);
            // callback(true);
        }

    }); // crea extension dblink

}



exports.conectarNodo = function conectarNodo(data, callback) { // realiza conexion dblink
    //console.log("select dblink_connect( '" + data.body.conn + "', 'host=" + data.body.server + " user=" + data.body.username + " password=" + data.body.pasw + " dbname=" + data.body.database + "')");
    client.query("select dblink_connect( '" + data.body.conn + "', 'host=" + data.body.server + " user=" + data.body.username + " password=" + data.body.pasw + " dbname=" + data.body.database + "')", (err, res) => {
        if (err) {
            console.log("Error de conexion a nodo.");
            callback(false);

        } else {
            console.log("\n\nConectado OK!: \n");
            callback(true);
        }

    })

}




/*
exports.conectarNodo = function conectarNodo(data, callback) { // realiza conexion dblink recibiendo una tabla con varios atributos
    console.log("...");

    client.query("select * from dblink('host=" + data.body.server + " user=" + data.body.username + " password=" + data.body.pasw + " dbname=" + data.body.database + "', 'select schema_name from information_schema.schemata') as esquemas ( nombre  character varying );	", (err, res) => {
        console.log("ERROR", err);
        if (err) {
            console.log("Error de conexion a datos.");
            //callback(false);

        } else {
            console.log("\n\nResultadoS: \n", err, res.rows);
            // callback(true);
        }

    })
    console.log("..");

}*/