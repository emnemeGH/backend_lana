import jwt from "jsonwebtoken";

const secret = process.env.SECRET;

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    
    // SI NO EXISTE EL HEADER
    if (!authHeader) {
        return res.status(401).json({ codigo: -1, mensaje: "Token no proporcionado" });
    }

    // SOPORTA FORMATOS: "Bearer token" O "token"
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // GUARDAMOS EL USUARIO EN EL REQUEST
        next();
    } catch (err) {
        return res.status(403).json({ codigo: -1, mensaje: "Token inválido" });
    }
};
