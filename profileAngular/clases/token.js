"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    // 1h = 1 hora; 1d = 1 dia
    constructor() {
    }
    static getToken(payLoad) {
        return jsonwebtoken_1.default.sign({
            usuario: payLoad
        }, this.semilla, { expiresIn: this.caducidad });
    }
    static validateToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.semilla, (err, decoded) => {
                if (err) {
                    reject();
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
exports.default = Token;
Token.semilla = "semilla-seed,privacidadYPropia-ProfileAngular";
Token.caducidad = "1h"; // Media Hora
