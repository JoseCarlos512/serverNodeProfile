"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middelwares/autenticacion");
const tecnologia_1 = require("../modelos/tecnologia");
const tecnologiaRuta = (0, express_1.Router)();
// Crear tecnologia
tecnologiaRuta.post('/create', autenticacion_1.verificarToken, (req, resp) => {
    const body = req.body;
    tecnologia_1.Tecnologia.create(body).then((tecnologiaDB) => {
        resp.json({
            ok: true,
            sobreMi: tecnologiaDB
        });
    }).catch((err) => {
        resp.json(err);
    });
});
// Actualizar informacion sobre mi
exports.default = tecnologiaRuta;
