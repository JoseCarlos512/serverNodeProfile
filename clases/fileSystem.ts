import path from 'path';
import fs from 'fs';

export default class FileSystem {
    
    constructor(){

    }

    public guardarImagen(file:any, nombre:string) {

        return new Promise<void>((resolve, reject) => {
            
            // crear carpeta
            const path = this.crearCarpeta(nombre);

            // nombre del archivo
            const nombreArchivo = file.name;

            // mover archivo
            file.mv(`${path}/${nombreArchivo}`, (err:any) => {
                
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            })
        })
    }

    private crearCarpeta(nombre: string) {
        const mStrPath = path.resolve(__dirname, '../uploads', nombre);
        const existe = fs.existsSync(mStrPath);

        if (!existe) {
            fs.mkdirSync(mStrPath);
        }

        return mStrPath;
    }
}