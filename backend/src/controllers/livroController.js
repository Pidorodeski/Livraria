import NaoEncontrado from "../erros/NaoEncontrado.js";
import {livro} from "../models/index.js";
import { processaBuscaLivro } from "../utils/validations.js"

class LivroController {

    static listarLivros = async (req, res, next) => {
        try {
            const buscaLivros = livro.find().populate("autor");
            req.resultado = buscaLivros;
            next();

        } catch (error) {
            next(error);
        }
    } 

    static async listarLivroPorId (req, res, next){
        try {
            const id = req.params.id;
            const livroBuscado = await livro.findById(id);

            if (livroBuscado !== null){
                res.status(200).send(livroBuscado);
            } else {
                next(new NaoEncontrado("Id do Livro nao encontrado"))
            }
        } catch (error) {
            next(error);
        }
    };

    static listarLivroPorFiltro = async (req, res, next) => {
        try {
            const busca = await processaBuscaLivro(req.query);
            if (busca !== null) {
                const livroResultado = livro.find(busca).populate("autor");
                req.resultado = livroResultado;
                next();
            } else {
                res.status(200).send([]);
            }
        } catch (error) {
            next(error);
        };
    }

    static async cadastrarLivros(req, res, next){
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: "Livro cadastrado com sucesso", livro: novoLivro });
        }   catch (error){
            next(error);
        }
    }

    static async atualizarLivros (req, res, next){
        try {
            const id = req.params.id;
            const livroAlterado = await livro.findByIdAndUpdate(id, {$set: req.body}, { new: true });

            if (livroAlterado !== null) {
                res.status(200).send({message: "Livro atualizado com sucesso", livro: livroAlterado});
            } else {
                next(new NaoEncontrado("Id do livro não localizado."));
            }
        } catch (error) {
            next(error);
        }
    }

    static async deletarLivro (req, res, next){
        try {
            const id = req.params.id;
            const idResultado = await livro.findByIdAndDelete(id);

            if (idResultado !== null) {
                res.status(200).json({ message: "livro excluído com sucesso" });
            } else {
                next(new NaoEncontrado("Id do Livro nao encontrado"))
            }           
        } catch (error) {
            next(error);
        }
    }
};

export default LivroController;