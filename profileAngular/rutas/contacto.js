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
    contacto_1.Contacto.findByIdAndRemove(id, (err, contactoBorrar) => {
        if (err)
            throw err;
        resp.json({
            ok: true,
            mensaje: "Comentario eliminado",
            body: contactoBorrar
        });
    });
});
// Obtener mensajes
contactoRutas.get('/', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const mensajes = yield contacto_1.Contacto.find()
        .sort({ _id: -1 })
        .limit(50)
        .exec();
    resp.json({
        ok: true,
        mensajes
    });
}));
exports.default = contactoRutas;
