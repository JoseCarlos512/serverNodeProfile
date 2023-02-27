import Server from "./clases/server";
import mongoose from "mongoose";
import cors from "cors";
import usuarioRutas from "./rutas/usuario";
import contactoRutas from "./rutas/contacto";
import bodyParser from "body-parser";
import imagenRuta from "./rutas/imagen";
import fileupload from "express-fileupload";
import sobreMiRuta from "./rutas/sobreMi";
import tecnologiaRuta from "./rutas/tecnologia";
import noticiaRuta from "./rutas/noticia";



const server = new Server();
const URI = 'mongodb://127.0.0.1:27017/profileAngularBD';


// Body Parser 
server.app.use(bodyParser.urlencoded({extended:true})); // le dice al sistema si desea utilizar un algoritmo simple o complejo
server.app.use(bodyParser.json()); // le dice al sistema que desea que se use json.


//CORS
server.app.use(cors({origin:true, credentials:true}));

// file upload
server.app.use(fileupload())

// Rutas - Principal
server.app.use('/usuario', usuarioRutas);
server.app.use('/contacto', contactoRutas);
server.app.use('/imagen', imagenRuta);
server.app.use('/sobremi', sobreMiRuta);
server.app.use('/tecnologia', tecnologiaRuta);
server.app.use('/noticia', noticiaRuta);

// Conectar con Base de Datos
mongoose
    .set('strictQuery', false)
    .connect(URI,
    (err) => {
        if (err) throw "err";
        console.log("Base de Datos Online")
    }
);

// Levantar Servidor
server.start(()=> {
    console.log("Servidor PROFILE-ANGULAR Corriendo en el puerto " + server.port)
})