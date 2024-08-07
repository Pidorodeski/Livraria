import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { usuario } from "../models/index.js";

const expirationTime = 30000;

class AuthController {
    static authLogin = async(req, res, next) =>{
        try {
            const { email, senha } = req.body;
            const usuarioLogin = await usuario.findOne({email: email})

            if (!usuarioLogin){
                return res.status(400).json({ message: "Usuario nao cadastrado" });
            }

            const senhaValidacao = await compare(senha, usuarioLogin.senha);
            if (!senhaValidacao){
                return res.status(400).json({ message: "Usuario ou senha incorreto" });
            }

            const accessToken = sign({
                id: usuarioLogin._id,
                email: usuarioLogin.email
            }, process.env.SECRET, {
                expiresIn: expirationTime
            })
            
            return res.json({ accessToken, expirationTime });

        } catch (error) {
            next(error)
        }
    }

}
export default AuthController; 