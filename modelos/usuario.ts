import { Schema, model } from "mongoose";

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

interface IUsuario extends Document {
    nombre: string;
    password: string;
}

export const Usuario = model<IUsuario>('Usuario', usuarioSchema)