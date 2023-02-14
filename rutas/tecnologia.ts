import { Router, Response } from "express";
import { verificarToken } from "../middelwares/autenticacion";
import { Tecnologia } from "../modelos/tecnologia";

const tecnologiaRuta = Router();

// Crear tecnologia
tecnologiaRuta.post('/create', verificarToken, (req: any, resp: Response) => {
    
    const body = req.body;

    Tecnologia.create(body).then((tecnologiaDB:any) => {
        resp.json({
            ok: true,
            sobreMi: tecnologiaDB
        })
    }).catch((err)=> {
        resp.json(err)
    })
    
})

// Actualizar informacion sobre mi


export default tecnologiaRuta;