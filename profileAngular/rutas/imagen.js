"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imagen_1 = require("../modelos/imagen");
const autenticacion_1 = require("../middelwares/autenticacion");
const fileSystem_1 = __importDefault(require("../clases/fileSystem"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
// Actualizar imagen
// Recibir el identificador para actualizar correctamente
imagenRuta.post('/update', autenticacion_1.verificarToken, (req, resp) => {
    const file = req.files.img;
    fileSystem.guardarImagen(file, req.usuario.nombre);
    resp.json({
        ok: true,
        mensaje: 'Imagen actualizada'
    });
});
imagenRuta.delete('/delete/:id/:name', autenticacion_1.verificarToken, (req, resp) => {
    const id = req.params.id;
    const name = req.params.name;
    imagen_1.Imagen.findByIdAndRemove(id, (err, imgBorrar) => {
        if (err)
            throw err;
        resp.json({
            ok: true,
            mensaje: 'Imagen eliminada',
            imgBorrar
        });
        fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '../uploads', 'carlos@untels.pe', name));
    });
});
exports.default = imagenRuta;
