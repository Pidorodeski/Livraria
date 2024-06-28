import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const listaAutores = autores.find({});
      req.resultado = listaAutores;

      next();
    } catch (error) {
      next(error);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await autores.findById(id)

      if (autorResultado !== null){
        res.status(200).send(autorResultado);
    } else {
        next(new NaoEncontrado("Id do Autor nao encontrado"))
    }
    } catch (error) {
      next(error);
    }
  }

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static editarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const idResultado = await autores.findByIdAndUpdate(id, {$set: req.body});

      if (idResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
    } else {
        next(new NaoEncontrado("Id do autor não localizado."));
    }
    } catch (error) {
      next(error);
    }
  }

  static deletarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const idResultado = await autores.findByIdAndDelete(id);

      if (idResultado !== null) {
        res.status(200).json({ message: "Autor excluído com sucesso" });
      } else {
        next(new NaoEncontrado("Id do autor nao encontrado"))
      }   
    } catch (error) {
      next(error);
    }
  }
}

export default AutorController;