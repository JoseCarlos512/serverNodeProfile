import { Response, NextFunction} from 'express';
import Token from '../clases/token';


export const verificarToken = (req:any, res:Response, next:NextFunction) => {

    const usuarioToken = req.get('miToken') || '';

    Token.validateToken(usuarioToken)
         .then((decoded:any)=>{
            req.usuario = decoded.usuario;
            next();   
         })
         .catch((err:any)=>{
            res.json({
                ok: false,
                mensaje: 'Token invalido',
                err
            })
         })

}