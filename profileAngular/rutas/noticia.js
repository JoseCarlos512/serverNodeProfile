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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileSystemNoticia_1 = __importDefault(require("../clases/fileSystemNoticia"));
const autenticacion_1 = require("../middelwares/autenticacion");
const noticia_1 = require("../modelos/noticia");
const noticiaRuta = (0, express_1.Router)();
const fileSystemNoticia = new fileSystemNoticia_1.default();
//Crear noticia
noticiaRuta.post('/:img/:imgYo', autenticacion_1.verificarToken, (req, resp) => {
    const body = req.body;
    const img = req.params.img;
    const imgYo = req.params.imgYo;
    body.img = img;
    body.imgYo = imgYo;
    noticia_1.Noticia.create(body).then((noticiaDB) => {
        resp.json({
            ok: true,
            noticia: noticiaDB
        });
    }).catch(err => {
        resp.json(err);
    });
});
// Obtener noticias paginadas
noticiaRuta.get('/', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let pagina = Number(req.query.pagina) || 1;
    let saltar = pagina - 1;
    saltar = saltar * 8;
    const noticia = yield noticia_1.Noticia.find()
        .sort({ _id: -1 })
        .skip(saltar)
        .limit(8)
        .exec();
    resp.json({
        ok: true,
        pagina,
        noticia
    });
}));
// Subir imagenes YO
noticiaRuta.post('/upload1', autenticacion_1.verificarToken, (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const file1 = req.files.imgYo;
    yield fileSystemNoticia.guardarImagenYo(file1);
    resp.json({
        ok: true,
        file1: file1.name
    });
}));
//Subir imagen noticias
noticiaRuta.post('/upload2', autenticacion_1.verificarToken, (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const file2 = req.files.img;
    yield fileSystemNoticia.guardarImagen(file2);
    resp.json({
        ok: true,
        file1: file2.name
    });
}));
// Obtener imagen NOTICIA
noticiaRuta.get('/imgNoticia/:img', (req, resp) => {
    const img = req.params.img;
    const pathImagen = fileSystemNoticia.getImgUrlNoticia(img);
    resp.sendFile(pathImagen);
});
// Obtener imagen YO
noticiaRuta.get('/imgYo/:img', (req, resp) => {
    const img = req.params.img;
    const pathImagen = fileSystemNoticia.getImgUrlYo(img);
    resp.sendFile(pathImagen);
});
exports.default = noticiaRuta;
