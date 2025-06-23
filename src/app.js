import express from "express";
import morgan from "morgan";
import cors from "cors";

// CARGAR VARIABLES DE ENTORNO (.env)
import dotenv from "dotenv";
dotenv.config(); // ← ESTO PERMITE USAR process.env.SECRET

import usuarioRoutes from "./routes/usuario.routes";
import loginRoutes from "./routes/login.routes";
import productoRoutes from "./routes/producto.routes";

const app = express();


app.set("port", 4000);


app.use(morgan("dev"));

app.use(express.json());

app.use(cors({
    origin: "http://127.0.0.1:5500", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

//Routes
app.use("/api",usuarioRoutes);
app.use("/api",loginRoutes);
app.use("/api", productoRoutes);






export default app;
