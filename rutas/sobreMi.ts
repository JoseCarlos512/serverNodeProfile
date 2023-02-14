import { Router, Response } from "express";
import { verificarToken } from "../middelwares/autenticacion";
import { SobreMi } from "../modelos/sobreMi";

const sobreMiRuta = Router();

// Subir imagen
sobreMiRuta.post('/create', verificarToken, (req: any, resp: Response) => {
    const body = req.body;
    body.titulo = "Jose Carlos Leon Tito";

    SobreMi.create(body).then((sobreMiDB:any) => {
        resp.json({
            ok: true,
            sobreMi: sobreMiDB
        })
    }).catch((err)=> {
        resp.json(err)
    })
    
})

export default sobreMiRuta;