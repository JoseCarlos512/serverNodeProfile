"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autenticacion_1 = require("../middelwares/autenticacion");
const sobreMi_1 = require("../modelos/sobreMi");
const sobreMiRuta = (0, express_1.Router)();
// Guardar informacion sobre mi
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
// Actualizar informacion sobre mi
sobreMiRuta.post('/update/:id', autenticacion_1.verificarToken, (req, resp) => {
    const id = req.params.id;
    const sobreMi = {
        texto1: req.body.texto1,
        texto2: req.body.texto2,
        texto3: req.body.texto3,
        texto4: req.body.texto4,
        texto5: req.body.texto5,
    };
    console.log(sobreMi);
    sobreMi_1.SobreMi.findByIdAndUpdate(id, sobreMi, { new: true }, (err, sobreMiDB) => {
        if (err)
            throw err;
        if (!sobreMiDB) {
            return resp.json({
                ok: false,
                mensaje: 'Invalid Data'
            });
        }
        resp.json({
            ok: true,
            sobreMi
        });
    });
});
exports.default = sobreMiRuta;
