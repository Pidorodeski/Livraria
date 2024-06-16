import NaoEncontrado from "../erros/NaoEncontrado.js";
import { usuario } from "../models/index.js";

class UsuarioController {
    static listarUsuarios = async (req, res, next) =>{
        try {
            const listarUsuarios = usuario.find();
            req.resultado = listarUsuarios;
            next()
        } catch (error) {
            next(error);
        }
    }

    static async listarUsuarioPorId (req, res, next) {
        try {
            const id = req.params.id;
            const usuarioBuscado = await usuario.findById(id);

            if (usuarioBuscado !== null) {
                res.status(200).send(usuarioBuscado);
            } else {
                next(new NaoEncontrado("Id do usuario nao encontrado"));
            }
        } catch (error) {
            next(error);
        }
    }

    static listarUsuarioPorFiltro = async (req, res, next) =>{
        try {
            const busca = await processaBusca(req.query);
            if(busca !== null){
                const usuarioResultado = usuario
                    .find(busca);

                req.resultado = usuarioResultado;
                next();
            } else (res.status(200).send([]))
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

    static deletarUsuario = async (req, res, next) =>{
        try {
            const id = req.params.id;
            const idResultado = await usuario.findByIdAndDelete(id);

            if (idResultado !== null) {
                res.status(200).json({message: "Usuario deletado com sucesso"});
            } else {
                next(new NaoEncontrado("Id do usuario não encontrado"));
            }
        } catch (error) {
            next(error);
        }
    }
}

async function processaBusca(parametros) {
    const {nome, cpf} = parametros;

    let busca = {};

    if(nome) busca.nome = {$regex: nome, $options: "i"};
    if(cpf) busca.cpf = {$regex: cpf, $options: "i"};
    return busca;
};

export default UsuarioController;