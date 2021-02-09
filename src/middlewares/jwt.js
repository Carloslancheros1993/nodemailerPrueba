import jwt, { decode } from "jsonwebtoken";


//Completar la funcion para generar un token JWT en base al usuario que ha iniciado sesion
export const generateJWT = (user) => {
    const userObj = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emal
    }
    const token = jwt.sign(userObj, process.env.SECRET_KEY, {algorithm: "HS384", expiresIn: "1h"});
    return token;
}

//Validar el token 
export const validateJWT = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided' });
    }
    // Decode the Tokenreq.userId = decoded.id;
    const decoded = await jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();
    }

