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

// Login Usuario
usuarioRutas.post('/login', (req: Request, resp: Response) => {
    
    const body = req.body;

    Usuario.findOne({nombre: body.nombre}, (err:any, usuarioDB:any) => {
        if (err) throw err;
        
        if (!usuarioDB) {
            return resp.json({
                ok: false,
                mensaje: 'Invalid data'
            })
        }

        if (usuarioDB.compararContrasena(body.password)) {
            resp.json({
                ok: true,
                usuario:usuarioDB,
                token: '123'
            })
        } else {
            return resp.json({
                ok: false,
                mensaje: 'Invalid Data'
            })
        }
    })
})

export default usuarioRutas;