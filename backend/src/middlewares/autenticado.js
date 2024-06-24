import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import jwt from 'jsonwebtoken';
const { sign, verify, decode } = jwt;
import { usuario } from "../models/index.js";
import jsonSecret from '../config/jsonSecret.js';

async function Autenticado(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ message: "Token nao informado" });
    }

    const [, accessToken] = token.split(" ");

    try {
        verify(accessToken, jsonSecret.secret);

        const decoded = decode(accessToken); 
        req.usuarioEmail = decoded.email;

        next();
    } catch (error) {
        res.status(401).send({ message: "Usuario nao autorizado" });
    }
}

export default Autenticado;
