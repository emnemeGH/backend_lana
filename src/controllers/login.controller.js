import { getConnection } from "./../database/database";
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const connection = await getConnection();

        // 🔸 Importante: desestructurar para obtener solo los resultados
        const [rows] = await connection.query(
            "SELECT id_usuario, nombre, apellido, rol FROM usuario WHERE email = ? AND password = ?",
            [email, password]
        );

        console.log("Resultado de la query:", rows);

        if (rows.length > 0) {
            console.log("Se encontró el usuario");

            const usuario = rows[0]; // 🔸 Primer resultado (el usuario)

            // 🔸 Generar token
            const token = jwt.sign(
                {
                    sub: usuario.id_usuario,
                    name: usuario.nombre,
                    exp: Date.now() + 60 * 30000 // ⚠️ Ojo: esto no sigue el formato JWT estándar (ver nota abajo)
                },
                secret
            );

            console.log("Token generado:", token);

            res.json({
                codigo: 200,
                mensaje: "OK",
                payload: usuario,
                token: token
            });
        } else {
            console.log("Usuario no encontrado");
            res.json({ codigo: -1, mensaje: "Usuario o contraseña incorrecta", payload: [] });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// const resetearPassword = async(req, res) => {
//     try{
//         const { id } = req.params
//         const {
//             password
//         } = req.body
//         const connection = await getConnection();
//         const respuesta = await connection.query("UPDATE usuario set password = ? where id_usuario = ?", [password, id]);
//         if(respuesta.affectedRows == 1){
//             res.json({codigo: 200, mensaje:"Contraseña restablecida", payload: []})
//         }
//         else{
//             res.json({codigo: -1, mensaje:"Usuario no encontrado", payload: []})
//         }
//         console.log(respuesta);
//     }
//     catch(error){
//         res.status(500);
//         res.send(error.message);
//     }
// }


export const methods = {
    login,
    // resetearPassword
};

            //CODGIO NUEVO DEL BACKEND A REVISAR!!!!!
// import { getConnection } from "./../database/database";
// const jwt = require ("jsonwebtoken");
// const secret = process.env.SECRET
// //crear usuario
// const login = async (req, res) => {
//     try{
//         const {
//             email,
//             password
//         } = req.body
//         const connection = await getConnection();
//         const respuesta = await connection.query("SELECT id_usuario, nombre, apellido, rol  FROM usuario WHERE email = ? AND password = ?", [email, password]);
//         const token = jwt.sign({
//             sub: respuesta.id,
//             name: respuesta.nombre,
//             exp: Date.now() + 60 * 30000
//         }, secret);
//         console.log(token)
//         if(respuesta.length > 0){
//             console.log("se encontro el usuario")
//             res.json({codigo: 200, mensaje: "OK", payload: respuesta, jwt: token});
//         }
//         else{
//             console.log("usuario no encontrado")
//             res.json({codigo: -1, mensaje: "Usuario o contraseña incorrecta", payload: respuesta});
//         }
//     }
//     catch(error){
//         res.status(500);
//         res.send(error.message);
//     }
// }

// // const resetearPassword = async(req, res) => {
// //     try{
// //         const { id } = req.params
// //         const {
// //             password
// //         } = req.body
// //         const connection = await getConnection();
// //         const respuesta = await connection.query("UPDATE usuario set password = ? where id_usuario = ?", [password, id]);
// //         if(respuesta.affectedRows == 1){
// //             res.json({codigo: 200, mensaje:"Contraseña restablecida", payload: []})
// //         }
// //         else{
// //             res.json({codigo: -1, mensaje:"Usuario no encontrado", payload: []})
// //         }
// //         console.log(respuesta);
// //     }
// //     catch(error){
// //         res.status(500);
// //         res.send(error.message);
// //     }
// // }


// export const methods = {
//     login,
//     // resetearPassword
// };