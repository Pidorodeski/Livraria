import { emprestimo, livro, usuario } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

class EmprestimoController {
    static realizarEmprestimo = async (req, res, next) =>{
        try {
            const livroId = req.params.idLivro;
            const usuarioId = req.params.idUsuario;
            
            const livroBusca = await livro.findById(livroId);
            const usuarioBusca = await usuario.findById(usuarioId);

            if (livroBusca !== null && usuarioBusca !== null){
                if (livroBusca.estaDisponivel == true) {
                    const novoEmprestimo = await emprestimo.create(req.body);
                    res.status(201).json({message: "Emprestimo realizado com sucesso", emprestimo: novoEmprestimo})
                    await livro.findByIdAndUpdate(livroId, { estaDisponivel: false });

                } else {
                    res.status(400).send({message: "Livro já em emprestimo"})
                }
            } else {
                next(new NaoEncontrado("Id do livro ou usuario não encontrado"))
            }
        } catch (error) {
            next(error);
        }
    }

}

export default EmprestimoController;

//Antes de criar um empréstimo, verifique se o livro está disponível (estaDisponivel: true). Isso pode ser feito com uma simples consulta no banco de dados.


