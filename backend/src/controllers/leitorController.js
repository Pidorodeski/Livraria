import { validarFormatoEmail, validarCPF } from "../utils/validations.js";
import { leitor } from "../models/index.js"

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

    static cadastrarLeitor = async (req, res, next) => {
        try {
            const {nome, email, cpf, dataNascimento} = req.body;

            if (!validarFormatoEmail(email)) {
                res.status(400).json({ message: "Formato de e-mail inválido" });
            }

            if (!validarCPF(cpf)) {
                res.status(400).json({ message: "CPF inválido" });
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
            const idResultado = await leitor.findByIdAndUpdate(id, {$set: req.body});

            if (idResultado !== null) {
                res.status(200).send({message: "Leitor atualizado com sucesso"});
            } else {
                next(new NaoEncontrado("Id do leitor não localizado."));
            }
        } catch (error) {
            next(error);
        }
    }
}

export default LeitorController;
