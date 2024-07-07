import { permissao } from "../models/index.js";

class PermissaoController {
    static listarPermissao = async(req, res, next) =>{
        try {
            const listarpermissao = permissao.find();
            req.resultado = listarpermissao;
            next();
        } catch (error) {
            next(error);
        }
    }
}
export default PermissaoController;