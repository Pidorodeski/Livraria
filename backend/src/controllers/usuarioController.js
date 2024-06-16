import NaoEncontrado from "../erros/NaoEncontrado.js";
import { usuario } from "../models/index.js";

class UsuarioController {
    static listarUsuarios = async (req, res, next) =>{
        try {
            const listarUsuarios = usuario.find({});
            req.resuldado = listarUsuarios;
            next()

        } catch (error) {
            next(error);
        }
    }

    static cadastrarUsuario = async (req, res, next) =>{
        try {
            const novoUsuario = await usuario.create(req.body);
            res.status(201).json({message: "Usuário cadastrado com sucesso", usuario: novoUsuario});
        } catch (error) {
            next(error);
        }
    }
}

export default UsuarioController;