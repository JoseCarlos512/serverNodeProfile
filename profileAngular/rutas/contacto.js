"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacto_1 = require("../modelos/contacto");
const contactoRutas = (0, express_1.Router)();
// Crear Contacto (API)
contactoRutas.post('/crear', (req, resp) => {
    const contacto = {
        email: req.body.email,
        mensaje: req.body.mensaje,
    };
    // Almacenar informacion (ACCION DB)
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
// Delete contacto
contactoRutas.delete("/delete/:id", (req, resp) => {
    const id = req.params.id;
    contacto_1.Contacto.findOneAndRemove(id, (err, contactoBorrar) => {
        if (err)
            throw err;
        resp.json({
            ok: true,
            mensaje: "Comentario eliminado",
            body: contactoBorrar
        });
    });
});
exports.default = contactoRutas;
