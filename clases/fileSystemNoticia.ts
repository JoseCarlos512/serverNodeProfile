import path from 'path';
import fs from 'fs';

export default class FileSystemNoticia {
    
    /**
     * 
     */
    constructor(){

    }

    /**
     * 
     * @param file 
     * @param nombre 
     * @returns 
     */
    public guardarImagen(file:any) {

        return new Promise<void>((resolve, reject) => {
            
            // crear carpeta
            const path = this.crearCarpeta("imgNoticia");

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
    
    /**
     * 
     * @param img 
     * @returns 
     */
    public getImgUrlNoticia(img: string) {
        const pathImagenNoticia = path.resolve(__dirname, '../uploads', 'imgNoticia',img)
        return pathImagenNoticia;
    }

    /**
     * 
     * @param file 
     * @param nombre 
     * @returns 
     */
    public guardarImagenYo(file:any) {

        return new Promise<void>((resolve, reject) => {
            
            // crear carpeta
            const path = this.crearCarpeta('imgYo');

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

    /**
     * 
     * @param img 
     * @returns 
     */
    public getImgUrlYo(img: string) {
        const pathImagenYo = path.resolve(__dirname, '../uploads', 'imgYo',img)
        return pathImagenYo;
    }

    /**
     * 
     * @param carpeta 
     * @returns 
     */
    private crearCarpeta(carpeta:string) {
        const mStrPath = path.resolve(__dirname, '../uploads/'+ carpeta);
        const existe = fs.existsSync(mStrPath);

        if (!existe) {
            fs.mkdirSync(mStrPath);
        }

        return mStrPath;
    }
}