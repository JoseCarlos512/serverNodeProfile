import { Router, Request, Response } from "express";

const usuarioRutas = Router();

// Crear Usuario
usuarioRutas.post('/crear', (req: Request, resp: Response) => {
    const usuario = {
        nombre: req.body.nombre,
        password: req.body.password
    };

    resp.json({
        ok: true,
        usuario
    })
})

export default usuarioRutas;