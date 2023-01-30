import { Router, Request, Response } from "express";
import { Contacto } from "../modelos/contacto";

import Token from "../clases/token";
import { verificarToken } from "../middelwares/autenticacion";

const contactoRutas = Router();

// Crear Contacto
contactoRutas.post('/crear', (req: Request, resp: Response) => {

    const contacto = {
        email: req.body.email,
        mensaje: req.body.mensaje,
    }

    // Almacenar informacion
    Contacto.create(contacto).then(contactoDB => {
        resp.json({
            ok: true,
            contactoDB
        })
    })
    .catch(err => {
        resp.json({
            ok: false,
            err
        })
    })
})

export default contactoRutas;