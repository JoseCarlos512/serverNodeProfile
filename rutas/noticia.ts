import { Response, Router } from "express";
import FileSystemNoticia from "../clases/fileSystemNoticia";
import { verificarToken } from "../middelwares/autenticacion";
import { Noticia } from "../modelos/noticia";


const noticiaRuta = Router();
const fileSystemNoticia = new FileSystemNoticia();

//Crear noticia
noticiaRuta.post('/:img/:imgYo', verificarToken, (req:any, resp:Response) => {

    const body = req.body;
    const img = req.params.img;
    const imgYo = req.params.imgYo;

    body.img = img;
    body.imgYo = imgYo;

    Noticia.create(body).then((noticiaDB:any) => {
        resp.json({
            ok: true,
            noticia: noticiaDB
        });

    }).catch(err => {
        resp.json(err)
    });
})

// Obtener noticias paginadas
noticiaRuta.get('/',async (req:any, resp:Response) => {
    
    let pagina = Number(req.query.pagina) || 1;
    let saltar = pagina - 1;
    saltar = saltar * 8;

    const noticia = await Noticia.find()
        .sort({_id: -1})
        .skip(saltar)
        .limit(8)
        .exec();

    resp.json({
        ok: true,
        pagina,
        noticia
    });
})

// Subir imagenes YO
noticiaRuta.post('/upload1', verificarToken,async (req:any, resp:Response) => {
    
    const file1 = req.files.imgYo;
    await fileSystemNoticia.guardarImagenYo(file1);

    resp.json({
        ok: true,
        file1: file1.name
    })
})

//Subir imagen noticias
noticiaRuta.post('/upload2', verificarToken,async (req:any, resp:Response) => {
    
    const file2 = req.files.img;
    await fileSystemNoticia.guardarImagen(file2);

    resp.json({
        ok: true,
        file1: file2.name
    })
})


// Obtener imagen NOTICIA
noticiaRuta.get('/imgNoticia/:img', (req:any, resp:Response) => {
    const img = req.params.img;
    const pathImagen = fileSystemNoticia.getImgUrlNoticia(img);
    resp.sendFile(pathImagen);
})

// Obtener imagen YO
noticiaRuta.get('/imgYo/:img', (req:any, resp:Response) => {
    const img = req.params.img;
    const pathImagen = fileSystemNoticia.getImgUrlYo(img);
    resp.sendFile(pathImagen);
})

export default noticiaRuta;