import { Router, Response } from "express";
import { verificarToken } from "../middelwares/autenticacion";
import { SobreMi } from "../modelos/sobreMi";

const sobreMiRuta = Router();

// Guardar informacion sobre mi
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

// Actualizar informacion sobre mi
sobreMiRuta.post('/update/:id', verificarToken, (req: any, resp: Response) => {
    const id = req.params.id;
    const sobreMi = {
        texto1: req.body.texto1,
        texto2: req.body.texto2,
        texto3: req.body.texto3,
        texto4: req.body.texto4,
        texto5: req.body.texto5,
    };

    console.log(sobreMi);

    SobreMi.findByIdAndUpdate(id, sobreMi, {new:true}, (err, sobreMiDB) => {
        
        if (err) throw err;
        if (!sobreMiDB) {
            return resp.json({
                ok: false,
                mensaje: 'Invalid Data'
            });
        }

        resp.json({
            ok:true,
            sobreMi
        })
    })
    
})


// Obtener informacion sobre mi
sobreMiRuta.get('/', async (req: any, resp: Response) => {
    
    const sobreMi = await SobreMi.find()
        .sort({_id:-1})
        .exec();
    
    resp.json({
        ok: true,
        sobreMi
    })
    
})


export default sobreMiRuta;