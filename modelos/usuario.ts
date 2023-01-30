import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

    const usuarioSchema = new Schema({
        nombre: {
            type: String,
            unique:true,
            required: [true, "El nombre el obligatorio"]
        },

        password: {
            type: String,
            unique:true,
            required: [true, "El contraseña el obligatoria"]
        }
    })

    /**
     *  Se esta insertando un metodo al esquema usuarios
     *  usando mongoose
     */
    usuarioSchema.method('compararContrasena', function(password: string = ''): boolean {
        if (bcrypt.compareSync(password, this.password)) {
            return true;
        } else {
            return false;
        }
    })

    interface IUsuario extends Document {
        nombre: string;
        password: string;
        compararContrasena(password:string): boolean
    }

export const Usuario = model<IUsuario>('Usuario', usuarioSchema)