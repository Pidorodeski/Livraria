import { emprestimo, livro, leitor } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { format } from 'date-fns';

class EmprestimoController {
    static listarEmprestimos = async (req, res, next) =>{
        try {
            const buscaEmprestimos = emprestimo.find();
            req.resultado = buscaEmprestimos;
            next();
        } catch (error) {
            next(error);
        }
    }

    static realizarEmprestimo = async (req, res, next) =>{
        const current = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

        try {
            const { livroId, usuarioId, dataDevolucao} = req.body;            
            if(!livroId){
                return res.status(400).json({message: "Id do livro deve ser informado!"});
            }

            if(!usuarioId){
                return res.status(400).json({message: "Id do usuário deve ser informado!"});
            }

            if(!dataDevolucao){
                dataDevolucao === null;
            }

            const livroBusca = await livro.findById(livroId);
            if(!livroBusca){
                return next(new NaoEncontrado("Id do livro nao encontrado!"))
            }

            const usuarioBusca = await leitor.findById(usuarioId);
            if(!usuarioBusca){
                return next(new NaoEncontrado("Id do usuário nao encontrado!"))
            }

            if (livroBusca.estaDisponivel === true) {
                const novoEmprestimo = await emprestimo.create({ livro: livroId, usuario: usuarioId, dataEmprestimo: current, dataDevolucao: dataDevolucao, devolvido: false});
                res.status(201).json({message: "Emprestimo realizado com sucesso", emprestimo: novoEmprestimo})
                await livro.findByIdAndUpdate(livroId, { estaDisponivel: false }, { new: true });
            } else {
                res.status(400).send({message: "Livro já em emprestimo"})
            }
        } catch (error) {
            next(error);
        }
    }

    static atualizarEmprestimo = async (req, res, next) =>{
        const emprestimoId = await emprestimo.find({id: req.param});
        if(!emprestimoId){
            return res.status(400).json({message: "Id do emprestimo incorreto"})
        }

        try {
            const { dataDevolucao, devolvido} = req.body;            
            if(devolvido === true){

            } else if(devolvido === false || devolvido ){
                
            }
            
        } catch (error) {
            next(error)
        }
    }

}

export default EmprestimoController;

//Antes de criar um empréstimo, verifique se o livro está disponível (estaDisponivel: true). Isso pode ser feito com uma simples consulta no banco de dados.


