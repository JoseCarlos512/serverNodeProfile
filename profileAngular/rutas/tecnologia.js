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
//Obtener tecnologias
tecnologiaRuta.get('/', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const tecnologias = yield tecnologia_1.Tecnologia.find()
        .exec();
    resp.json({
        ok: true,
        tecnologias
    });
}));
// Actualizar tecnologias
tecnologiaRuta.post('/update/:id', autenticacion_1.verificarToken, (req, resp) => {
    const id = req.params.id;
    const tecnologia = {
        icono: req.body.icono,
        tecnologia: req.body.tecnologia,
        experiencia: req.body.experiencia,
    };
    tecnologia_1.Tecnologia.findByIdAndUpdate(id, tecnologia, { new: true }, (err, tecnologiaDB) => {
        if (err)
            throw err;
        if (!tecnologiaDB) {
            return resp.json({
                ok: 'false',
                mensaje: 'Invalid data'
            });
        }
        resp.json({
            ok: true,
            tecnologia
        });
    });
});
exports.default = tecnologiaRuta;
