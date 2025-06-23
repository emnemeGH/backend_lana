import mysql from "mysql2/promise";

import config from "./../config";

// FUNCION ASYNC QUE DEVUELVE CONEXIÓN ABIERTA
async function getConnection() {
    // SE CORRIGE: SE DEBE AWAIT EN LA CREACION DE CONEXION
    const connection = await mysql.createConnection({
        host: config.host,
        database: config.database,
        user: config.user,
        password: config.password
    });
    return connection;
}

export { getConnection }; // USAR EXPORT PARA CONSISTENCIA CON IMPORT
