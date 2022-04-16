// CONFIGURACIÓN INICIAL EXPRESS
// importo la librería de Express
const express = require("express");
// Iniciar express
const app = express();
// CONFIGURACION INICIAL MONGOOSE
// Para conectarse al servidor de Mongo:
const mongoose = require("mongoose");
// Importo la librería que maneja la seguridad con las variables de ambiente
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

// Iniciar variable de ambiente de seguridad
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB Connection successful!")).catch((err)=> {
    console.log(err);
});

app.use(cors());
//  Para poder hacer pruebas con Postman, debo iniciar express.json
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, ()=> {
    console.log("Backend server is running!");
});
