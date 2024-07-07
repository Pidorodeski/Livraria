import { usuario, perfil } from "../models/index.js";

const roles = (listaRoles) => {
    return async (req, res, next) => {
        const { usuarioId } = req;

        try {
            const user = await usuario.findById(usuarioId).populate('perfil');
            const roleNome = user.perfil.nomePerfil;
            const rolesCadastradas = listaRoles.includes(roleNome);

            if (!rolesCadastradas) {
                return res.status(401).send(`Usuario ${roleNome} não possui acesso a esta funcionalidade`);
            }

            return next();
        } catch (error) {
            next(error);
        }       
    }
}

export default roles;