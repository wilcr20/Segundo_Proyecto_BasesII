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


exports.obtenerSchema = function conectarNodo(data, callback) { // realiza conexion dblink recibiendo una tabla con varios atributos
    console.log("entra a esqumas obtener");
    client.query("select * from dblink('host=" + data.body.server + " user=" + data.body.username + " password=" + data.body.pasw + " dbname=" + data.body.database + "', 'select DISTINCT  table_schema from information_schema.role_table_grants') as esquemas ( nombre  character varying );	", (err, res) => {
        if (err) {
            console.log("Error de obtencion esquema a datos.");
            callback(false);

        } else {
            console.log("\n\nResultados de esquemas: \n", res.rows);
            callback(res.rows); // res.row obtiene la tabla de los resultados obtenidos del query
        }

    })

}