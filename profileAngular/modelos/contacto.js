"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contacto = void 0;
const mongoose_1 = require("mongoose");
const contactoSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    email: {
        type: String,
        required: [true, "El email el obligatorio"]
    },
    mensaje: {
        type: String,
        required: [true, "El mensaje el obligatoria"]
    }
});
/**
 *  Se ejecutara este middelware despues del esquema
 *  como se ejecuta un poc antes puede modificar el
 *  esquema como lo esta haciendo con created
 */
contactoSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Contacto = (0, mongoose_1.model)('Contacto', contactoSchema);
