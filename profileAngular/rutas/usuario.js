"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../modelos/usuario");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../clases/token"));
const autenticacion_1 = require("../middelwares/autenticacion");
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
                mensaje: 'Tu Usuario no fue encontrado en la BD'
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
                mensaje: 'Tu constraseña fue mal escrita'
            });
        }
    });
});
// Actualizar Usuario
usuarioRutas.post('/update', autenticacion_1.verificarToken, (req, resp) => {
    const usuario = {
        nombre: req.body.nombre || req.usuario.nombre,
        password: req.body.password || req.usuario.password
    };
    // Encryptar password
    usuario.password = bcryptjs_1.default.hashSync(usuario.password, 10);
    usuario_1.Usuario.findByIdAndUpdate(req.usuario._id, usuario, { new: true }, (err, userDB) => {
        if (err)
            throw err;
        if (!userDB) {
            resp.json({
                ok: false,
                mensaje: 'Informacion invalida'
            });
        }
        const miToken = token_1.default.getToken({
            _id: userDB === null || userDB === void 0 ? void 0 : userDB._id,
            nombre: userDB === null || userDB === void 0 ? void 0 : userDB.nombre,
            password: userDB === null || userDB === void 0 ? void 0 : userDB.password
        });
        resp.json({
            ok: true,
            token: miToken
        });
    });
});
usuarioRutas.get('/', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield usuario_1.Usuario.find().exec();
    //const user = await Usuario.find().limit(2).exec();
    resp.json({
        ok: true,
        users: user
    });
}));
exports.default = usuarioRutas;
