import { Router } from "express";
import { methods as productoController} from "./../controllers/producto.controller";
import { verificarToken } from "./../middlewares/auth.middleware.js";
const router = Router();

// RUTA PÚBLICA: NO NECESITA TOKEN
router.get("/obtenerProductos", productoController.obtenerProductos)
router.get("/obtenerDatosProducto/:id", productoController.obtenerDatosProducto)

// RUTAS PROTEGIDAS: NECESITAN TOKEN VÁLIDO EN HEADER (verificarToken auth.middleware.js)
router.post("/crearCategoria", verificarToken, productoController.crearCategoria)
router.post("/cargarProducto", verificarToken, productoController.cargarProducto)
router.get("/obtenerCategorias", verificarToken, productoController.obtenerCategorias); // 👈 PROTEGIDA CON TOKEN
router.put("/modificarStock", verificarToken, productoController.modificarStock)
router.post("/crearInventario", verificarToken,productoController.crearInventario)

// FAVORITOS
router.post("/agregarFavorito", verificarToken,productoController.agregarFavorito)
router.get("/obtenerFavoritos/:id", verificarToken,productoController.obtenerFavoritos);
router.delete("/eliminarFavorito", verificarToken,productoController.eliminarFavorito);
router.post("/agregarFavorito", verificarToken,productoController.agregarFavorito)

// CARRITO
router.post("/agregarACarrito", verificarToken,productoController.agregarACarrito)
router.get("/obtenerFavoritos/:id", verificarToken,productoController.obtenerFavoritos);
router.delete("/eliminarProductoCarrito", verificarToken,productoController.eliminarProductoCarrito);
router.get("/obtenerProductosCarrito/:id", verificarToken,productoController.obtenerProductosCarrito);

export default router;