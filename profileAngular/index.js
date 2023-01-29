"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const usuario_1 = __importDefault(require("./rutas/usuario"));
const body_parser_1 = __importDefault(require("body-parser"));
const server = new server_1.default();
const URI = 'mongodb://127.0.0.1:27017/profileAngularBD';
// Body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// Rutas
server.app.use('/usuario', usuario_1.default);
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
