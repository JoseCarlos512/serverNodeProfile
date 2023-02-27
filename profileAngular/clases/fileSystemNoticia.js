"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class FileSystemNoticia {
    /**
     *
     */
    constructor() {
    }
    /**
     *
     * @param file
     * @param nombre
     * @returns
     */
    guardarImagen(file) {
        return new Promise((resolve, reject) => {
            // crear carpeta
            const path = this.crearCarpeta("imgNoticia");
            // nombre del archivo
            const nombreArchivo = file.name;
            // mover archivo
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    /**
     *
     * @param img
     * @returns
     */
    getImgUrlNoticia(img) {
        const pathImagenNoticia = path_1.default.resolve(__dirname, '../uploads', 'imgNoticia', img);
        return pathImagenNoticia;
    }
    /**
     *
     * @param file
     * @param nombre
     * @returns
     */
    guardarImagenYo(file) {
        return new Promise((resolve, reject) => {
            // crear carpeta
            const path = this.crearCarpeta('imgYo');
            // nombre del archivo
            const nombreArchivo = file.name;
            // mover archivo
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
    /**
     *
     * @param img
     * @returns
     */
    getImgUrlYo(img) {
        const pathImagenYo = path_1.default.resolve(__dirname, '../uploads', 'imgYo', img);
        return pathImagenYo;
    }
    /**
     *
     * @param carpeta
     * @returns
     */
    crearCarpeta(carpeta) {
        const mStrPath = path_1.default.resolve(__dirname, '../uploads/' + carpeta);
        const existe = fs_1.default.existsSync(mStrPath);
        if (!existe) {
            fs_1.default.mkdirSync(mStrPath);
        }
        return mStrPath;
    }
}
exports.default = FileSystemNoticia;
