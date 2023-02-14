import { Router, Request, Response } from "express";
import { Imagen } from "../modelos/imagen";
import { verificarToken } from "../middelwares/autenticacion";
import FileSystem from "../clases/fileSystem";
import fs from "fs";
import path from "path";

const imagenRuta = Router();
const fileSystem = new FileSystem();

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

        console.log("nombre: ")
        fileSystem.guardarImagen(file, req.usuario.nombre);
    }).catch((err)=> {
        resp.json(err)
    })
    
})


// Mostrar imagen por URL
imagenRuta.get('/:img', (req:any, resp:Response) => {
    const img = req.params.img;
    const pathImagen = fileSystem.getImgUrl(img);
    resp.sendFile(pathImagen+"");
});

// Actualizar imagen
// Recibir el identificador para actualizar correctamente
imagenRuta.post('/update', verificarToken, (req:any, resp:Response) => {
    const file = req.files.img;
    fileSystem.guardarImagen(file, req.usuario.nombre);

    resp.json({
        ok: true,
        mensaje: 'Imagen actualizada'
    });
});

imagenRuta.delete('/delete/:id/:name', verificarToken, (req: any, resp:Response) => {
    
    const id = req.params.id;
    const name = req.params.name;
    
    Imagen.findByIdAndRemove(id, (err:any, imgBorrar:any) => {
        if (err) throw err;

        resp.json({
            ok: true,
            mensaje: 'Imagen eliminada',
            imgBorrar
        })

        fs.unlinkSync(path.resolve(__dirname, '../uploads', 'carlos@untels.pe', name))
    });
})

export default imagenRuta;