// CONFIGURACIÓN INICIAL EXPRESS
const express = require("express");
// Iniciar express
const app = express();
// CONFIGURACION INICIAL MONGOOSE
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")

// Iniciar variable de entorno de seguridad
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB Connection successful!")).catch((err)=> {
    console.log(err);
});
//  Para poder hacer pruebas con Postman, debo iniciar express.json
app.use(express.json());
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 5000, ()=> {
    console.log("Backend server is running");
});
