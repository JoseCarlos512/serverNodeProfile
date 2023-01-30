import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

    const contactoSchema = new Schema({
        created: {
            type: Date
        },
        email: {
            type: String,
            required: [true, "El email el obligatorio"]
        },

        mensaje: {
            type: String,
            required: [true, "El mensaje el obligatoria"]
        }
    })

    /**
     *  Se ejecutara este middelware despues del esquema
     *  como se ejecuta un poc antes puede modificar el 
     *  esquema como lo esta haciendo con created
     */
    contactoSchema.pre<IContacto>('save', function(next) {
        
        this.created = new Date();
        next();
    })

    interface IContacto extends Document {
        created: Date,
        email: string;
        mensaje: string;
    }

export const Contacto = model<IContacto>('Contacto', contactoSchema)