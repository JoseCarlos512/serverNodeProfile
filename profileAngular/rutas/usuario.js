"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../modelos/usuario");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuarioRutas = (0, express_1.Router)();
// Crear Usuario
usuarioRutas.post('/crear', (req, resp) => {
    const usuario = {
        nombre: req.body.nombre,
        password: bcryptjs_1.default.hashSync(req.body.password, 10)
    };
    // Almacenar informacion en Base de datos
    usuario_1.Usuario.create(usuario).then(usuarioDB => {
        resp.json({
            ok: true,
            usuario: usuarioDB
        });
    }).catch(err => {
        resp.json({
            ok: false,
            err
        });
    });
});
exports.default = usuarioRutas;
