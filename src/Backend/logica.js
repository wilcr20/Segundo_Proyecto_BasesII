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
            callback(true);
        }
    })
}



exports.conectarNodo = function conectarNodo(data, callback) {
    client.query('SELECT * from persona', (err, res) => {
        if (err) {
            console.log("Error de conexion a datos.");
            callback(false);

        } else {
            console.log("\n\nResultadoS: \n", err, res.rows);
            callback(true);
        }

    })

}