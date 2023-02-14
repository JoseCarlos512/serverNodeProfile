"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imagen_1 = require("../modelos/imagen");
const autenticacion_1 = require("../middelwares/autenticacion");
const fileSystem_1 = __importDefault(require("../clases/fileSystem"));
const imagenRuta = (0, express_1.Router)();
const fileSystem = new fileSystem_1.default();
// Subir imagen
imagenRuta.post('/', autenticacion_1.verificarToken, (req, resp) => {
    const body = req.body;
    const file = req.files.img;
    body.img = file.name;
    console.log(file);
    imagen_1.Imagen.create(body).then((imgDB) => {
        resp.json({
            ok: true,
            imgDB
        });
        console.log("nombre: ");
        fileSystem.guardarImagen(file, req.usuario.nombre);
    }).catch((err) => {
        resp.json(err);
    });
});
// Mostrar imagen por URL
imagenRuta.get('/:img', (req, resp) => {
    const img = req.params.img;
    const pathImagen = fileSystem.getImgUrl(img);
    resp.sendFile(pathImagen + "");
});
exports.default = imagenRuta;
