import dotenv from "dotenv";   // IMPORTAMOS dotenv
dotenv.config();               // CARGAMOS VARIABLES DEL .env


import app from "./app";
const jwt = require("jsonwebtoken");

const main = () => {
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};


main();
