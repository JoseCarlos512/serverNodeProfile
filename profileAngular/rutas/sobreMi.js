"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middelwares/autenticacion");
const sobreMi_1 = require("../modelos/sobreMi");
const sobreMiRuta = (0, express_1.Router)();
// Subir imagen
sobreMiRuta.post('/create', autenticacion_1.verificarToken, (req, resp) => {
    const body = req.body;
    body.titulo = "Jose Carlos Leon Tito";
    sobreMi_1.SobreMi.create(body).then((sobreMiDB) => {
        resp.json({
            ok: true,
            sobreMi: sobreMiDB
        });
    }).catch((err) => {
        resp.json(err);
    });
});
exports.default = sobreMiRuta;
