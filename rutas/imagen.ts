import { Router, Request, Response } from "express";
import { Imagen } from "../modelos/imagen";
import { verificarToken } from "../middelwares/autenticacion";

const imagenRuta = Router();

// Subir imagen
imagenRuta.post('/', verificarToken, (req: any, resp: Response) => {
    const body = req.body;
    const file = req.files.img;

    body.img = file.name;
    console.log(file);

    Imagen.create(body).then((imgDB:any) => {
        resp.json({
            ok: true,
            imgDB
        })
    }).catch((err)=> {
        resp.json(err)
    })
    
})

export default imagenRuta;