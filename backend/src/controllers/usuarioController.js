import NaoEncontrado from "../erros/NaoEncontrado.js";
import { usuario } from "../models/index.js";
import bcrypt from 'bcryptjs';




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

    static async cadastrarUsuario(req, res, next) {
        try {
            const { nome, email, senha, cpf, dataNascimento } = req.body;
            // Verifica se todos os campos necessários estão presentes
            if (!(email && senha)) {
                return res.status(400).json({ message: "Os campos de Email e Senha devem ser informados" });
            }
            
            // Verifica o formato do email
            const formatoEmailValido = await validarFormatoEmail(email);
            if (!formatoEmailValido) {
                return res.status(400).json({ message: "Formato de e-mail inválido" });
            }
    
            // Verifica se o email já está cadastrado
            const existeUsuario = await usuario.findOne({ email });
            if (existeUsuario) {
                return res.status(400).json({ message: "E-mail já inserido na base de dados" });
            }

            const hashSenha = await bcrypt.hash(senha, 10); // Gera o hash da senha com 10 salt rounds
            const novoUsuario = await usuario.create({ nome, email, senha: hashSenha, cpf, dataNascimento });
    
            res.status(201).json({ message: "Usuário cadastrado com sucesso", usuario: novoUsuario });
    
        } catch (error) {
            next(error);
        }
    }
    
    

    static editarUsuario = async (req, res, next) =>{
        try {
            const id = req.params.id;
            const idResultado = await usuario.findByIdAndUpdate(id, {$set: req.body});

            if (idResultado !== null){
                res.status(200).send({message: "Usuario atualizado com sucesso"})
            } else {
                next(new NaoEncontrado("Id do usuario nao encontrado"));
            }
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

    static specialDeleteUsuarios = async (req, res, next) => {
        try {
            await usuario.deleteMany({});
            res.status(200).json({message: "Todo os usuarios foram deletados"});
        } catch (error) {
            
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

async function validarFormatoEmail(email) {
    // Regex para validar formato de email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


export default UsuarioController;