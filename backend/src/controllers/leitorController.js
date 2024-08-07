import { validarFormatoEmail, validarCPF } from "../utils/validations.js";
import { leitor } from "../models/index.js"
import { processaBuscaLeitor } from "../utils/validations.js";

class LeitorController {
    static listarLeitores = async (req, res, next) => {
        try {
            const listaLeitores = leitor.find({});
            req.resultado = listaLeitores;
            next();
        } catch (error) {
            next(error);
        }
    }

    static listarLeitorPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const idResultado = await leitor.findById(id);

            if (idResultado !== null){
                res.status(200).send(idResultado);
            } else {
                next(new NaoEncontrado("Id do Leitor nao encontrado"))
            }
        } catch (error) {
            next(error);
        }
    }

    static listarLeitorPorFiltro = async (req, res, next) =>{
        try {
            const busca = await processaBuscaLeitor(req.query);
            if (busca !== null) {
                const leitorResultado = leitor.find(busca);
                req.resultado = leitorResultado;
                next();
            } else {
                res.status(200).send([]);
            }
        } catch (error) {
            next(error);
        }
    }

    static cadastrarLeitor = async (req, res, next) => {
        try {
            const {nome, email, cpf, dataNascimento} = req.body;

            if (!validarFormatoEmail(email)) {
                return res.status(400).json({ message: "Formato de e-mail inválido" });
            }

            const validaExisteNome = await leitor.findOne({email});
            if (validaExisteNome){
                return res.status(400).json({message: "E-mail já inserido na base!"});
            }

            if (!validarCPF(cpf)) {
                return res.status(400).json({ message: "CPF inválido" });
            }

            const validaExisteCPF = await leitor.findOne({cpf});
            if (validaExisteCPF){
                return res.status(400).json({message: "CPF informado já inserido na base!"})
            }

            const novoLeitor = await leitor.create({ nome, email, cpf, dataNascimento });
            res.status(201).json({ message: "Usuario Leitor cadastrado com sucesso", leitor: novoLeitor });
        } catch (error) {
            next(error);
        }
    }

    static editarLeitor = async (req, res, next) => {
        try {
            const id = req.params.id;
            const {email, cpf, dataNascimento} = req.body;
            const leitorAlteracao = await leitor.findById(id)

            if(email !== leitorAlteracao.email){
                return res.status(400).json({message: "E-mail não pode ser alterado"})
            }
            
            if (!validarCPF(cpf)) {
                return res.status(400).json({ message: "CPF inválido" });
            }

            const idResultado = await leitor.findByIdAndUpdate(id, {$set: req.body}, { new: true });

            if (idResultado !== null) {
                res.status(201).send({message: "Leitor atualizado com sucesso", leitor: idResultado});
            } else {
                next(new NaoEncontrado("Id do leitor não localizado."));
            }
        } catch (error) {
            next(error);
        }
    }

    static deletarLeitor = async (req, res, next) => {
        try {
            const id = req.params.id
            const idResultado = await leitor.findByIdAndDelete(id);

            if (idResultado !== null) {
                res.status(200).send({message: "Leitor deletado com sucesso"});
            } else {
                next(new NaoEncontrado("Id do leitor não localizado."));
            }

        } catch (error) {
            next(error);
        }
    }
}

export default LeitorController;
