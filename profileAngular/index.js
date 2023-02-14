"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const usuario_1 = __importDefault(require("./rutas/usuario"));
const contacto_1 = __importDefault(require("./rutas/contacto"));
const body_parser_1 = __importDefault(require("body-parser"));
const imagen_1 = __importDefault(require("./rutas/imagen"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const sobreMi_1 = __importDefault(require("./rutas/sobreMi"));
const server = new server_1.default();
const URI = 'mongodb://127.0.0.1:27017/profileAngularBD';
// Body Parser 
server.app.use(body_parser_1.default.urlencoded({ extended: true })); // le dice al sistema si desea utilizar un algoritmo simple o complejo
server.app.use(body_parser_1.default.json()); // le dice al sistema que desea que se use json.
// file upload
server.app.use((0, express_fileupload_1.default)());
// Rutas - Principal
server.app.use('/usuario', usuario_1.default);
server.app.use('/contacto', contacto_1.default);
server.app.use('/imagen', imagen_1.default);
server.app.use('/sobremi', sobreMi_1.default);
// Conectar con Base de Datos
mongoose_1.default
    .set('strictQuery', false)
    .connect(URI, (err) => {
    if (err)
        throw "err";
    console.log("Base de Datos Online");
});
// Levantar Servidor
server.start(() => {
    console.log("Servidor PROFILE-ANGULAR Corriendo en el puerto " + server.port);
});
