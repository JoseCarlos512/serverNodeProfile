import { Router, Request, Response } from "express";
import { Contacto } from "../modelos/contacto";

import Token from "../clases/token";
import { verificarToken } from "../middelwares/autenticacion";

const contactoRutas = Router();

// Crear Contacto (API)
contactoRutas.post('/crear', (req: Request, resp: Response) => {

    const contacto = {
        email: req.body.email,
        mensaje: req.body.mensaje,
    }

    // Almacenar informacion (ACCION DB)
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

// Delete contacto
contactoRutas.delete("/delete/:id", (req:any, resp: Response) => {
    const id = req.params.id;

    Contacto.findOneAndRemove(id, (err:any, contactoBorrar:any) => {

        if (err) throw err;
        resp.json({
            ok: true,
            mensaje: "Comentario eliminado",
            body: contactoBorrar
        })
    })
})

export default contactoRutas;