"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imagen_1 = require("../modelos/imagen");
const autenticacion_1 = require("../middelwares/autenticacion");
const imagenRuta = (0, express_1.Router)();
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
    }).catch((err) => {
        resp.json(err);
    });
});
exports.default = imagenRuta;
