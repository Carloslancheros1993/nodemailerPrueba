import {Users} from "../models/";
import bcryptjs from "bcryptjs";
import {generateJWT} from "../middlewares/jwt";


//1. Completar la logica para manejar el inicio de sesión
// - responder con un codigo de estado 401 cuando las credenciales sean incorrectas
// - responder con un mensaje (message) y codigo de estado 200 cuando las credenciales sean correctas
// - responder con el token jwt (token) 
export const login = async (req, res) => {
    const {email, password} = req.body;
    const results = await Users.findOne({where: {email: email}});
    if(results){
        const valid = bcryptjs.compareSync(password, results.password);
        if(valid){
            const token = generateJWT(results);
            return res.json({
                message: "Has iniciado sesion correctamente",
                token
            });
        }
        return res.json({
            message: "Las credenciales son incorrectas"
        });
    }
    return res.json({
        message: "Las credenciales son incorrectas"
    });
    //bcryptjs.compareSync()
}

//2. Completar el registro de usuario
// - responder con un codigo de estado fallido 400 > cuando hagan falta campos o cuando el usuario ya exista en la base de datos
// - responder con el objeto del usuario que ha sido creado y un codigo 201 cuando el registro sea satisfactorio
export const signIn = async (req, res) => {
    try{
        const pass = req.body.password;
        const encryptedPass = bcryptjs.hashSync(pass, 10);
        req.body.password = encryptedPass;
        const results = await Users.create(req.body);
        res.json(results);
    }catch(error){
        console.log(error);
    }
}

