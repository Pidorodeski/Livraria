import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores, livro} from "../models/index.js";

class LivroController {

    static listarLivros = async (req, res, next) => {
        try {
            const buscaLivros = livro.find();
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
            const busca = await processaBusca(req.query);

            if (busca !== null) {
                const livroResultado = await livro
                .find(busca)
                .populate("autor");

            res.status(200).send(livroResultado)
            } else {
                res.status(200).send([]);
            }

            
        } catch (error) {
            next(error);
        };
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

    static specialDeleteLivros = async (req, res, next) => {
        try {
          await livro.deleteMany({});
          res.status(200).json({ message: "Todos os livros foram deletados" });
        } catch (error) {
          next(error);
        }
      }
};

async function processaBusca(parametros) {
    const {titulo, editora, nomeAutor} = parametros;

    let busca = {};

    if(titulo) busca.titulo = {$regex: titulo, $options: "i"};
    if(editora) busca.editora = {$regex: editora, $options: "i"};
    if(nomeAutor){
        const autor = await autores.findOne({nome: nomeAutor});
        if (autor !== null) {
            busca.autor = autor._id;
        } else {
            busca = null;
        }
        
    }
    return busca;
};

export default LivroController;
