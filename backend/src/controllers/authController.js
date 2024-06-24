import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { usuario } from "../models/index.js";
import jsonSecret from '../config/jsonSecret.js';


class AuthController {
    static authLogin = async(req, res, next) =>{
        try {
            const {email, senha } = req.body;
            const usuarioLogin = await usuario.findOne({email: email})
            if (!usuarioLogin){
                return res.status(400).json({ message: "Usuario nao cadastrado" });
            }

            const senhaValidacao = await compare(senha, usuarioLogin.senha);
            if (!senhaValidacao){
                return res.status(400).json({ message: "Usuario ou senha incorreto" });
            }

            const accessToken = sign({
                id: usuario.id,
                email: usuario.email
            }, jsonSecret.secret, {
                expiresIn: 30
            })
            return res.json({ accessToken });

        } catch (error) {
            next(error)
        }
    }

}
export default AuthController; 