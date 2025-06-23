import { getConnection } from "./../database/database";
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET; // ASEGURATE QUE ESTÁ DEFINIDA EN TU .ENV Y CARGADA CON DOTENV

//crear usuario
const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const connection = await getConnection(); // CORREGIDO: getConnection es async y se debe await
        const respuesta = await connection.query(
            "SELECT id_usuario, nombre, apellido, rol FROM usuario WHERE email = ? AND password = ?", 
            [email, password]
        );

        if (respuesta.length > 0) {
            const usuario = respuesta[0]; // CORREGIDO: acceder al primer elemento del array

            // CREAR TOKEN CON expiresIn (30 minutos) Y CLAIMS CORRECTOS
            const token = jwt.sign(
                {
                    sub: usuario.id_usuario,
                    name: usuario.nombre
                },
                secret,
                { expiresIn: "30m" }
            );

            console.log("Token generado:", token);
            res.json({ codigo: 200, mensaje: "OK", payload: [usuario], jwt: token }); // SE MANTIENE EL CAMPO 'jwt' COMO TOKEN
        }
        else {
            console.log("usuario no encontrado");
            res.json({ codigo: -1, mensaje: "Usuario o contraseña incorrecta", payload: [] });
        }
    }
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

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
