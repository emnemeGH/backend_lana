import { getConnection } from "./../database/database";
const secret = process.env.secret;
const jwt = require("jsonwebtoken");


const obtenerProductos = async (req, res) => {
    try {
        const connection = await getConnection();
        const response = await connection.query("select p.nombre as producto, p.descripcion as descripcion, p.precio as precio, p.genero as genero, p.imagen as ulrImagen, c.id_categoria as idCategoria, c.nombre as categoria from producto p join categoria c on p.id_categoria = c.id_categoria;")
        res.json({ codigo: 200, mensaje: "OK", payload: response });
    }
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const obtenerDatosProducto = async (req, res) => {
    try {
        const id = req.params.id
        const connection = await getConnection();
        const response = await connection.query("select p.nombre as producto, p.descripcion as descripcion, p.precio as precio, p.genero as genero, p.imagen as ulrImagen, c.id_categoria as idCategoria, c.nombre as categoria, i.talle, i.color, i.stock, i.id_inventario as idInventario from producto p join categoria c on p.id_categoria = c.id_categoria join inventario i on i.id_producto = p.id_producto where p.id_producto = ?;", [id]);
        console.log(response)
        res.json({ codigo: 200, mensaje: "OK", payload: response });
    }
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const cargarProducto = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado == false) {
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }

        const {
            nombre,
            descripcion,
            precio,
            genero,
            id_categoria,
            imagen
        } = req.body;

        const producto = {
            nombre,
            descripcion,
            precio,
            genero,
            id_categoria,
            imagen
        };

        const connection = await getConnection();

        const response = await connection.query("INSERT INTO producto SET ?", producto);
        const resultado = response[0];

        console.log("Respuesta MySQL al insertar:", resultado);

        if (resultado?.insertId) {
            res.json({
                codigo: 200,
                mensaje: "Producto cargado",
                payload: [{ id_producto: resultado.insertId }]
            });
        } else {
            res.json({
                codigo: -1,
                mensaje: "Error cargando producto",
                payload: []
            });
        }
    } catch (err) {
        console.error("Error en el backend al cargar producto:", err);
        res.status(500).json({ mensaje: err.message });
    }
};

const modificarStock = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado == false) {
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }
        const {
            id_inventario,
            stock
        } = req.body;

        const connection = await getConnection();
        const [result] = await connection.query(
            "UPDATE inventario i SET i.stock = ? WHERE id_inventario = ?",
            [stock, id_inventario]
        );

        if (result.affectedRows > 0) {
            res.json({
                codigo: 200,
                mensaje: "Stock modificado correctamente",
                payload: []
            });
        } else {
            res.json({
                codigo: -1,
                mensaje: "Error modificando stock",
                payload: []
            });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const crearInventario = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado == false) {
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }
        const {
            talle,
            color,
            stock,
            id_producto
        } = req.body;

        const inventario = {
            talle,
            color,
            stock,
            id_producto
        };

        const connection = await getConnection();
        const [result] = await connection.query("INSERT INTO inventario SET ?", inventario);

        if (result.affectedRows > 0) {
            res.json({
                codigo: 200,
                mensaje: "Inventario creado exitosamente",
                payload: [{ idInventario: result.insertId }]
            });
        } else {
            res.json({ codigo: -1, mensaje: "Error creando inventario", payload: [] });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const crearCategoria = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado == false) {
            return res.status(401).json({ codigo: -1, mensaje: resultadoVerificar.error });
        }

        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({ codigo: -1, mensaje: "Falta el nombre de la categoría" });
        }

        const categoria = { nombre };
        const connection = await getConnection();
        const response = await connection.query("INSERT INTO categoria SET ?", categoria);
        const resultado = response[0]; // Extraés el objeto con affectedRows e insertId

        if (resultado.affectedRows > 0) {
            return res.status(200).json({
                codigo: 200,
                mensaje: "Categoría añadida",
                payload: [{ idCategoria: resultado.insertId }]
            });
        } else {
            return res.status(500).json({
                codigo: -1,
                mensaje: "No se pudo insertar la categoría",
                payload: []
            });
        }
    } catch (error) {
        console.error("Error en crearCategoria:", error);
        return res.status(500).json({
            codigo: -1,
            mensaje: "Error interno del servidor",
            error: error.message
        });
    }
};


const obtenerCategorias = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado == false) {
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }
        const connection = await getConnection();
        const [categorias] = await connection.query("SELECT * from categoria");
        res.json({ codigo: 200, mensaje: "OK", payload: categorias });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const agregarFavorito = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado == false) {
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }

        const { id_producto, id_usuario } = req.body;
        const favorito = { id_producto, id_usuario };

        const connection = await getConnection();
        const [result] = await connection.query("INSERT INTO favorito SET ?", favorito);

        if (result.affectedRows > 0) {
            res.json({
                codigo: 200,
                mensaje: "Producto añadido a favoritos",
                payload: [{ idFavorito: result.insertId }]
            });
        } else {
            res.json({ codigo: -1, mensaje: "Error añadiendo a favoritos", payload: [] });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};



function verificarToken(req) {
    const token = req.headers.authorization;

    if (!token) {
        return { estado: false, error: "Token no proporcionado" };
    }

    try {
        const payload = jwt.verify(token, secret); // Esto lanza un error si está expirado
        return { estado: true, payload }; // opcional: devolver el payload también
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return { estado: false, error: "Token expirado" };
        } else {
            return { estado: false, error: "Token inválido" };
        }
    }
}

const obtenerFavoritos = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado == false) {
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }

        const id_usuario = req.params.id;

        const connection = await getConnection();
        const response = await connection.query("SELECT id_producto as idProducto FROM favorito WHERE id_usuario = ?", [id_usuario]);

        res.json({
            codigo: 200,
            mensaje: "IDs de productos favoritos obtenidos correctamente",
            payload: response
        });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const eliminarFavorito = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado == false) {
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }

        const { id_usuario, id_producto } = req.body;

        const connection = await getConnection();
        const response = await connection.query("DELETE FROM favorito WHERE id_usuario = ? AND id_producto = ?", [id_usuario, id_producto]);

        if (response && response.affectedRows > 0) {
            res.json({ codigo: 200, mensaje: "Favorito eliminado correctamente" });
        } else {
            res.json({ codigo: 400, mensaje: "Error eliminando producto de favoritos" });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const agregarACarrito = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado == false) {
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }

        const { id_inventario, id_usuario } = req.body;
        const carritoProducto = { id_inventario, id_usuario };

        const connection = await getConnection();
        const [result] = await connection.query("INSERT INTO carrito SET ?", carritoProducto);

        if (result.affectedRows > 0) {
            res.json({
                codigo: 200,
                mensaje: "Producto agregado al carrito",
                payload: [{ idCarrito: result.insertId }]
            });
        } else {
            res.json({ codigo: -1, mensaje: "Error agregando producto al carrito", payload: [] });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const eliminarProductoCarrito = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado == false) {
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }

        const { id_usuario, id_inventario } = req.body;

        const connection = await getConnection();
        const [result] = await connection.query(
            "DELETE FROM carrito WHERE id_usuario = ? AND id_inventario = ?",
            [id_usuario, id_inventario]
        );

        if (result.affectedRows > 0) {
            res.json({ codigo: 200, mensaje: "Producto eliminado del carrito correctamente" });
        } else {
            res.json({ codigo: 400, mensaje: "No se encontró el producto en el carrito" });
        }
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const obtenerProductosCarrito = async (req, res) => {
    try {
        const resultadoVerificar = verificarToken(req);
        if (resultadoVerificar.estado == false) {
            return res.send({ codigo: -1, mensaje: resultadoVerificar.error });
        }

        const id_usuario = req.params.id;

        const connection = await getConnection();
        const response = await connection.query("SELECT c.id_carrito as idCarrito, c.id_inventario as idInventario, p.nombre as producto, p.id_producto as idProducto, p.precio as precio, p.imagen as urlImagen, i.talle, i.color FROM carrito c JOIN inventario i ON i.id_inventario = c.id_inventario JOIN producto p ON p.id_producto = i.id_producto WHERE c.id_usuario = ?;", [id_usuario]);

        res.json({
            codigo: 200,
            mensaje: "Productos del carrito obtenidos correctamente",
            payload: response[0] // Solo los datos reales
        });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};








export const methods = {
    obtenerProductos,
    crearCategoria,
    cargarProducto,
    obtenerCategorias,
    obtenerDatosProducto,
    modificarStock,
    crearInventario,
    agregarFavorito,
    obtenerFavoritos,
    eliminarFavorito,
    agregarACarrito,
    eliminarProductoCarrito,
    obtenerProductosCarrito


}
