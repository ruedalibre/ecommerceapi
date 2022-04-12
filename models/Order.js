/* CONSTRUCCION MODELO DEL OBJETO ORDER */

const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    // El objeto de producto se repite porque las órdenes están compuestas de productos. Lo que varía son su cantidad, la dirección y el estado de la orden (ver abajo)
    {
        userId: { type: String, required: true},
        products: [
            { 
                productId:{
                    type: String
                 },
                 quatity: {
                     type: Number,
                     default: 1,
                 },
            },
        ],
        amount: {type: Number, required: true},
        /* Como las direcciones están compuestas de varios datos, puedo crear ese valor directamente como un objeto */
        address: {type: Object, required: true},
        /* El estado es pendiente hasta que se termine de procesar la orden */
        status: {type: String, default: "pending"}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema);