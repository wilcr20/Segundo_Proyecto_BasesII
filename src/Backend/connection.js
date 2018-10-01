const { Client } = require('pg');

exports.conecta = function() {
    var connectionData = {
        user: 'postgres',
        host: 'localhost',
        database: 'proyectoBases',
        password: 'alvarado',
        port: 5432
    }

    const client = new Client(connectionData);


    client.query("select * from persona")
        .then(response => {
            console.log("resp: ", response.rows)
            client.end()
        })
        .catch(err => {
            console.log("fail");
            client.end()
        })

}