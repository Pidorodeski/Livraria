import NaoEncontrado from "../erros/NaoEncontrado.js";
import {livro} from "../models/index.js";

class LivroController {

    static async listarLivros(req, res, next){
        try {
            //throw new Error()
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
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
            const {titulo, editora} = req.query;

            const busca = {};

            if (editora) busca.editora = editora;
            if (titulo) busca.titulo = titulo;

            const livroResultado = await livro.find(busca);
            res.status(200).send(livroResultado)

        } catch (error) {
            next(error);
        }
    }

    static listarLivroPorEditora = async (req, res, next) => {
        try {
            const editora = req.query.editora;
            const livroResultado = await livro.find({"editora": editora});

            res.status(200).send(livroResultado)
        } catch (error) {
            next(error)
        }
    }

    static async cadastrarLivros(req, res, next){
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: "cadastrado com sucesso", livro: novoLivro });
        }   catch (error){
            next(error);
        }
    }

    static async atualizarLivros (req, res, next){
        try {
            const id = req.params.id;
            const idResultado = await livro.findByIdAndUpdate(id, {$set: req.body});

            if (idResultado !== null) {
                res.status(200).send({message: "Livro atualizado com sucesso"});
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
