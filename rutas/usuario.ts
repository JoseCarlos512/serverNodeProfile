import { Router, Request, Response } from "express";
import { Usuario } from "../modelos/usuario";

import bcrypt from "bcryptjs";

const usuarioRutas = Router();

// Crear Usuario
usuarioRutas.post('/crear', (req: Request, resp: Response) => {
    
    const usuario = {
        nombre: req.body.nombre,
        password: bcrypt.hashSync(req.body.password,10)
    };

    // Almacenar informacion en Base de datos
    Usuario.create(usuario).then(usuarioDB => {
        resp.json({
            ok: true,
            usuario: usuarioDB
        })
    }).catch(err => {
        resp.json({
            ok: false,
            err
        })
    })
})

export default usuarioRutas;