import { perfil } from "../models/index.js";

class PerfilAcesso {
    static listarPerfil = async(req, res, next) =>{
        try {
            const listarPerfil = perfil.find();
            req.resultado = listarPerfil;
            next();
        } catch (error) {
            next(error);
        }
    }

    static cadastrarPerfil = async(req, res, next) =>{
        try {
            const {nomePerfil, status} = req.body;

            const validaNome = await perfil.findOne({nomePerfil});
            if(validaNome){
                return res.status(400).json({message: "Nome inserido já cadastrado!"});
            }

            const validaStatus = await perfil.findOne({status});
            if(validaStatus){
                return res.status(400).json({message: "Status inserido já cadastrado!"});
            }

            const novoPerfil = await perfil.create({nomePerfil, status});
            res.status(201).json({message: "Perfil cadsastrado com sucesso!", perfil: novoPerfil})

        } catch (error) {
            next(error);
        }
    }
}
export default PerfilAcesso;