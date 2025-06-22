import { getConnection } from "./../database/database";
const secret = process.env.secret;
const jwt = require ("jsonwebtoken");

const obtenerDatosUsuario = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);

        if (resultadoVerificar.estado === false) {
            console.log("Token inválido:", resultadoVerificar.error);
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }

        const id = req.params.id;
        console.log("Buscando usuario con ID:", id);

        const connection = await getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM usuario u WHERE u.id_usuario = ?",
            [id]
        );

        if (rows.length === 1) {
            console.log("Usuario encontrado:", rows[0]);
            res.json({ codigo: 200, mensaje: "OK", payload: rows[0] });
        } else {
            console.warn("Usuario no encontrado con ID:", id);
            res.json({ codigo: -1, mensaje: "Usuario no encontrado", payload: [] });
        }

    } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        res.status(500).send({ codigo: -500, mensaje: "Error interno del servidor", error: error.message });
    }
};

const modificarUsuario = async (req, res) => {
    try{
        const resultadoVerificar = verificarToken(req);
        if(resultadoVerificar.estado == false){
            return res.send({codigo: -1, mensaje: resultadoVerificar.error})
        }
        const { id } = req.params
        const {
            nombre,
            apellido,
            direccion,
            email,
            telefono,
            rol,
            password
        } = req.body

        const usuario = {
            nombre,
            apellido,
            direccion,
            password,
            email,
            telefono,
            rol,
        }
        const connection = await getConnection();
        const response = await connection.query("UPDATE usuario u SET ? where u.id_usuario = ?",[usuario,id]);
        if(response.affectedRows > 0){
            res.json({codigo: 200, mensaje:"OK", payload: []})
        }
        else{
            res.json({codigo: -1, mensaje:"Error modificando datos del usuario", payload: []})
        }

    }
    catch(error){
            res.status(500);
            res.send(error.message);
    }
}
                    //CODIGIO DEL NUEVO DEL BACKEND A CHEQUEAR!!!!!!!!!!!!!!!!!!!!!!
// const crearUsuario = async (req, res) => {
//     try{
//         const {
//             nombre,
//             apellido,
//             direccion,
//             email,
//             telefono,
//             rol,
//             password
//         } = req.body

//         const usuario = {
//             nombre,
//             apellido,
//             direccion,
//             password,
//             email,
//             telefono,
//             rol,
//         }

//         const connection = await getConnection();
//         const response = await connection.query("INSERT INTO usuario set ?",usuario)
//         if(response && response.affectedRows > 0){
//             res.json ({codigo: 200, mensaje: "Usuario registrado exitosamente", payload: [{id_usuario: response.insertId}]});
//         }
//         else{
//             res.json({codigo: -1, mensaje: "Error registrando usuario", payload: []});
//         }
        
//     }
//     catch(error){
//         res.status(500);
//         res.send(error.message);
//     }
// }



// function verificarToken(req){
//     const token = req.headers.authorization;
//     if(!token){
//         return {estado: false, error: "Token no proporcionado"}
//     }
//     try{
//         const payload = jwt.verify(token, secret);
//         if(Date.now() > payload.exp){
//             return {estado: false, error: "Token expirado"}
//         }
//         return {estado: true};
//     }
//     catch(error){
//         return {estado: false, error: "Token inválido"}
//     }  

// }

// export const methods = {
//     obtenerDatosUsuario,
//     crearUsuario,
//     modificarUsuario
// }

// import { getConnection } from "./../database/database";
// const secret = process.env.secret;
// const jwt = require ("jsonwebtoken");

// const obtenerDatosUsuario = async (req, res) => {
//     try{
//         const resultadoVerificar = verificarToken(req);
//         if(resultadoVerificar.estado == false){
//             return res.send({codigo: -1, mensaje: resultadoVerificar.error})
//         }
//         const id = req.params.id
//         const connection = await getConnection();
//         const response = await connection.query("SELECT * from usuario u where u.id_usuario = ?",id);
//         if(response.length == 1){
//             res.json({codigo: 200, mensaje:"OK", payload: response})
//         }
//         else{
//             res.json({codigo: -1, mensaje:"Usuario no encontrado", payload: []})
//         }

//     }
//     catch(error){
//             res.status(500);
//             res.send(error.message);
//     }
// }

// const modificarUsuario = async (req, res) => {
//     try{
//         const resultadoVerificar = verificarToken(req);
//         if(resultadoVerificar.estado == false){
//             return res.send({codigo: -1, mensaje: resultadoVerificar.error})
//         }
//         const { id } = req.params
//         const {
//             nombre,
//             apellido,
//             direccion,
//             email,
//             telefono,
//             rol,
//             password
//         } = req.body

//         const usuario = {
//             nombre,
//             apellido,
//             direccion,
//             password,
//             email,
//             telefono,
//             rol,
//         }
//         const connection = await getConnection();
//         const response = await connection.query("UPDATE usuario u SET ? where u.id_usuario = ?",[usuario,id]);
//         if(response.affectedRows > 0){
//             res.json({codigo: 200, mensaje:"OK", payload: []})
//         }
//         else{
//             res.json({codigo: -1, mensaje:"Error modificando datos del usuario", payload: []})
//         }

//     }
//     catch(error){
//             res.status(500);
//             res.send(error.message);
//     }
// }

// const crearUsuario = async (req, res) => {
//     try{
//         const {
//             nombre,
//             apellido,
//             direccion,
//             email,
//             telefono,
//             rol,
//             password
//         } = req.body

//         const usuario = {
//             nombre,
//             apellido,
//             direccion,
//             password,
//             email,
//             telefono,
//             rol,
//         }

//         const connection = await getConnection();
//         const response = await connection.query("INSERT INTO usuario set ?",usuario)
//         if(response && response.affectedRows > 0){
//             res.json ({codigo: 200, mensaje: "Usuario registrado exitosamente", payload: [{id_usuario: response.insertId}]});
//         }
//         else{
//             res.json({codigo: -1, mensaje: "Error registrando usuario", payload: []});
//         }
        
//     }
//     catch(error){
//         res.status(500);
//         res.send(error.message);
//     }
// }



// function verificarToken(req){
//     const token = req.headers.authorization;
//     if(!token){
//         return {estado: false, error: "Token no proporcionado"}
//     }
//     try{
//         const payload = jwt.verify(token, secret);
//         if(Date.now() > payload.exp){
//             return {estado: false, error: "Token expirado"}
//         }
//         return {estado: true};
//     }
//     catch(error){
//         return {estado: false, error: "Token inválido"}
//     }  

// }

// export const methods = {
//     obtenerDatosUsuario,
//     crearUsuario,
//     modificarUsuario
// }