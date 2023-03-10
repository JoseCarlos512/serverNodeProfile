"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, "El nombre el obligatorio"]
    },
    password: {
        type: String,
        unique: true,
        required: [true, "El contraseña el obligatoria"]
    }
});
/**
 *  Se esta insertando un metodo al esquema usuarios
 *  usando mongoose
 */
usuarioSchema.method('compararContrasena', function (password = '') {
    if (bcryptjs_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
exports.Usuario = (0, mongoose_1.model)('Usuario', usuarioSchema);
