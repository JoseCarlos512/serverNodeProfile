import { Router, Request, Response } from "express";
import { Usuario } from "../modelos/usuario";

import bcrypt from "bcryptjs";
import Token from "../clases/token";
import { verificarToken } from "../middelwares/autenticacion";

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
                mensaje: 'Tu Usuario no fue encontrado en la BD'
            })
        }

        if (usuarioDB.compararContrasena(body.password)) {

            const token = Token.getToken({
                _id: usuarioDB._id,
                nombre: usuarioDB.nombre,
                password: usuarioDB.password
            });

            resp.json({
                ok: true,
                token: token
            })

        } else {
            return resp.json({
                ok: false,
                mensaje: 'Tu constraseña fue mal escrita'
            })
        }
    })
})

// Actualizar Usuario
usuarioRutas.post('/update', verificarToken, (req:any, resp:Response) => {
    
    const usuario = {
        nombre: req.body.nombre || req.usuario.nombre,
        password: req.body.password || req.usuario.password
    }

    // Encryptar password
    usuario.password = bcrypt.hashSync(usuario.password,10)

    Usuario.findByIdAndUpdate(req.usuario._id, usuario, {new:true}, (err, userDB) => {
        
        if (err) throw err
        if (!userDB) {
            resp.json({
                ok: false,
                mensaje: 'Informacion invalida'
            })
        }

        const miToken = Token.getToken({
            _id: userDB?._id,
            nombre: userDB?.nombre,
            password: userDB?.password
        })

        resp.json({
            ok: true,
            token: miToken
        })
    })
})

usuarioRutas.get('/',async (req:any, resp:Response) => {
    
    const user = await Usuario.find().exec();
    //const user = await Usuario.find().limit(2).exec();

    resp.json({
        ok: true,
        users: user
    })
})


export default usuarioRutas;