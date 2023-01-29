import jwt from 'jsonwebtoken';

export default class Token {
    private static semilla:string = "semilla-seed,privacidadYPropia-ProfileAngular"
    private static caducidad: string = "1800" // Media Hora
    // 1h = 1 hora; 1d = 1 dia

    constructor() {

    }


    static getToken(payLoad: any): string {

        return jwt.sign({
            usuario: payLoad
        }, this.semilla, {expiresIn: this.caducidad});
    }

    static validateToken(userToken: string) {

        return new Promise((resolve, reject) => {

            jwt.verify(userToken, this.semilla, (err, decoded) => {

                if (err) {
                    reject();
                } else {
                    resolve(decoded);
                }
            });
        });
    }
}