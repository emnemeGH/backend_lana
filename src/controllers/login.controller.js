import { getConnection } from "./../database/database";
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const connection = await getConnection();

        // Ejecutamos la consulta
        const [rows] = await connection.query(
            "SELECT id_usuario, nombre, apellido, rol FROM usuario WHERE email = ? AND password = ?",
            [email, password]
        );

        // Si hay resultados, significa que el usuario existe
        if (rows.length > 0) {
            const usuario = rows[0]; // Obtenemos el primer usuario (debería ser único)

            // Creamos el token JWT
            const token = jwt.sign(
                {
                    sub: usuario.id_usuario,
                    name: usuario.nombre,
                    exp: Math.floor(Date.now() / 1000) + 60 * 30 // Expira en 30 minutos
                },
                secret
            );

            console.log("Token generado:", token);
            console.log("Usuario encontrado");

            // Respondemos con éxito
            res.json({
                codigo: 200,
                mensaje: "OK",
                payload: usuario,
                jwt: token
            });

        } else {
            console.log("Usuario no encontrado");
            res.json({
                codigo: -1,
                mensaje: "Usuario o contraseña incorrecta",
                payload: []
            });
        }

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    login,
    // resetearPassword
};
