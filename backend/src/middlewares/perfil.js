import { usuario, permissao} from "../models/index.js";
import { possuiPermissaoValidacao } from "../utils/validations.js";

const roles = (listaRoles) => {
    return async (req, res, next) => {
        const { usuarioId } = req;
        const rotaNome = req.originalUrl.split('?')[0].split('/').slice(1)[0];
        const metodoRequisicao = req.method.toLowerCase();

        try {
            const user = await usuario.findById(usuarioId).populate('perfil');
            const roleNome = user.perfil.nomePerfil;
            const rolesCadastradas = listaRoles.includes(roleNome);

            if (!rolesCadastradas) {
                return res.status(401).send(`Usuario ${roleNome} não possui acesso a esta funcionalidade`);
            }

            const permissaoId = await permissao.findOne({perfil: user.perfil._id});
            const recursoAcoes = permissaoId.recursos.find(recurso => recurso.nomeRecurso === rotaNome);
            const permissaoRegras = recursoAcoes ? recursoAcoes.acoes : [];

            const possuiPermissao = possuiPermissaoValidacao(permissaoRegras, metodoRequisicao);
            if(possuiPermissao){
                return next();
            } else {
                return res.status(401).send(`Usuario ${roleNome} não possui acesso a rota ${metodoRequisicao}`);
            }
        } catch (error) {
            next(error);
        }       
    }
}

export default roles;