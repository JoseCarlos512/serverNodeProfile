import { Schema, model, Document } from "mongoose";

const imagenSchema = new Schema({
    img: {
        type: String,
        unique: true
    }
});

interface IImagen extends Document {
    img: string
}

export const Imagen = model<IImagen>('Imagen', imagenSchema);