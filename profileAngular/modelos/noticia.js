"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Noticia = void 0;
const mongoose_1 = require("mongoose");
const noticiaSchema = new mongoose_1.Schema({
    created: {
        type: Date
    },
    titulo: {
        type: String
    },
    subtitulo: {
        type: String
    },
    autor: {
        type: String
    },
    img: {
        type: String
    },
    imgYo: {
        type: String
    },
    texto1: {
        type: String
    },
    texto2: {
        type: String
    },
    texto3: {
        type: String
    },
    texto4: {
        type: String
    },
    texto5: {
        type: String
    }
});
noticiaSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Noticia = (0, mongoose_1.model)('Noticia', noticiaSchema);
