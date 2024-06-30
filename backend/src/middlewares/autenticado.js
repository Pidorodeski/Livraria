import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { verify, decode } = jwt;

async function Autenticado(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ message: "Token nao informado" });
    }

    const [, accessToken] = token.split(" ");

    try {
        verify(accessToken, process.env.SECRET);

        const decoded = decode(accessToken); 
        req.usuarioEmail = decoded.email;

        next();
    } catch (error) {
        res.status(401).send({ message: "Usuario nao autorizado" });
    }
}

export default Autenticado;
