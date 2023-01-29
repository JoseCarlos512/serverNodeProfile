"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioRutas = (0, express_1.Router)();
// Crear Usuario
usuarioRutas.post('/crear', (req, resp) => {
    const usuario = {
        nombre: req.body.nombre,
        password: req.body.password
    };
    resp.json({
        ok: true,
        usuario
    });
});
exports.default = usuarioRutas;
