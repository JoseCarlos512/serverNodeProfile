"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tecnologia = void 0;
const mongoose_1 = require("mongoose");
const tecnologiaSchema = new mongoose_1.Schema({
    icono: {
        type: String,
        required: [true, "El icono es obligatorio"]
    },
    tecnologia: {
        type: String,
        required: [true, "La tecnologia es obligatorio"]
    },
    experiencia: {
        type: String,
        required: [true, "La experiencia es obligatoria"]
    }
});
exports.Tecnologia = (0, mongoose_1.model)('Tecnologia', tecnologiaSchema);
