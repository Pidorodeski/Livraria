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

}
export default PerfilAcesso;