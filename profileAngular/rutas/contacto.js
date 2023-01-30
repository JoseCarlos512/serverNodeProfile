"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacto_1 = require("../modelos/contacto");
const contactoRutas = (0, express_1.Router)();
// Crear Contacto
contactoRutas.post('/crear', (req, resp) => {
    const contacto = {
        email: req.body.email,
        mensaje: req.body.mensaje,
    };
    // Almacenar informacion
    contacto_1.Contacto.create(contacto).then(contactoDB => {
        resp.json({
            ok: true,
            contactoDB
        });
    })
        .catch(err => {
        resp.json({
            ok: false,
            err
        });
    });
});
exports.default = contactoRutas;
