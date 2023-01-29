"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../modelos/usuario");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../clases/token"));
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
// Login Usuario
usuarioRutas.post('/login', (req, resp) => {
    const body = req.body;
    usuario_1.Usuario.findOne({ nombre: body.nombre }, (err, usuarioDB) => {
        if (err)
            throw err;
        if (!usuarioDB) {
            return resp.json({
                ok: false,
                mensaje: 'Invalid data'
            });
        }
        if (usuarioDB.compararContrasena(body.password)) {
            const token = token_1.default.getToken({
                _id: usuarioDB._id,
                nombre: usuarioDB.nombre,
                password: usuarioDB.password
            });
            resp.json({
                ok: true,
                token: token
            });
        }
        else {
            return resp.json({
                ok: false,
                mensaje: 'Invalid Data'
            });
        }
    });
});
exports.default = usuarioRutas;
