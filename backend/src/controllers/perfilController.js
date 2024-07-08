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

    static listarPerfilPorId = async (req, res, next) =>{
        try {
            const id = req.params.id;
            const perfilBuscado = await perfil.findById(id);

            if (perfilBuscado !== null){
                res.status(200).send(perfilBuscado);
            } else {
                next(new NaoEncontrado("Id do perfil nao encontrado"))
            }
        } catch (error) {
            next(error);
        }
    }
}
export default PerfilAcesso;