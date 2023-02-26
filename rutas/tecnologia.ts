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

//Obtener tecnologias
tecnologiaRuta.get('/',async (req:any, resp:Response) => {
    
    const tecnologias = await Tecnologia.find()
        .exec();

    resp.json({
        ok:true,
        tecnologias
    })
})

// Actualizar tecnologias
tecnologiaRuta.post('/update/:id', verificarToken, (req:any, resp:Response) => {
    const id = req.params.id;
    const tecnologia = {
        icono : req.body.icono,
        tecnologia : req.body.tecnologia,
        experiencia : req.body.experiencia,
    }

    Tecnologia.findByIdAndUpdate(id, tecnologia, {new:true}, (err, tecnologiaDB) => {

        if (err) throw err;
        if (!tecnologiaDB) {
            return resp.json({
                ok: 'false',
                mensaje: 'Invalid data'
            })
        }

        resp.json({
            ok: true,
            tecnologia
        })

    })

})


export default tecnologiaRuta;