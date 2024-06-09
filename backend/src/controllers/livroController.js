import livro from "../models/Livro.js";

class LivroController {

    static async listarLivros(req, res){
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha ao listar livros`});
        }
    } 

    static async listarLivroPorId (req, res){
        try {
            const id = req.params.id;
            const livroBuscado = await livro.findById(id);

            if (livroBuscado !== null){
                res.status(200).send(livroBuscado);
            } else {
                res.status(400).send({message: "Id do Livro nao encontrado"});
            }
        } catch (error) {
            res.status(500).send({ message: 'Erro interno do servidor'});
        }
    };

    static async cadastrarLivros(req, res){
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ message: "cadastrado com sucesso", livro: novoLivro });
        }   catch (error){
            res.status(500).json({ message: `${error.message} - falha ao cadastrar livro`});
        }
    }

    static async atualizarLivros (req, res){
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "livro atualizado" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na atualização do livro`});
        }
    }

    static async deletarLivro (req, res){
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({ message: "livro excluído com sucesso" });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha na deleção do livro`});
        }
    }

    static async listarLivroPorTitulo (req, res){
        const titulo = req.query.titulo;
        try {
            const livroPorTitulo = await livro.find({titulo: titulo});
            res.status(200).json(livroPorTitulo)
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha ao listar livro`});
        }
    }

};

export default LivroController;
