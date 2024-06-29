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
      const {nome, nacionalidade} = req.body;

      const validaNome = await autores.findOne({nome});
      if(validaNome){
        return res.status(400).json({message: "Nome inserido já cadastrado!"});
      }

      const novoAutor = await autores.create({nome, nacionalidade});
      res.status(201).json({message: "Autor cadastrado com sucesso", autores: novoAutor});
    } catch (erro) {
      next(erro);
    }
  };

static editarAutor = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { nome } = req.body;

    const usuarioBuscaNome = await autores.findOne({nome});
    const usuarioBuscaId = await autores.findById(id);

    if (!usuarioBuscaId) {
      return next(new NaoEncontrado("Id do autor não localizado."));
    }

    // Se nao foi passado o nome no put
    if (!nome){
      const autorEditado = await autores.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      res.status(200).json({message: "Autor editado com sucesso!", autores: autorEditado})
    
    // Se o nome autor passado nao existir na base
    } else if (!usuarioBuscaNome) {
      const autorEditado = await autores.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      res.status(200).json({message: "Autor editado com sucesso!", autores: autorEditado})
    
    // Se o nome passado no put for igual ao nome 
    } else if (usuarioBuscaNome.id === usuarioBuscaId.id && usuarioBuscaNome.nome === usuarioBuscaId.nome){
      const autorEditado = await autores.findByIdAndUpdate(id, { $set: req.body }, { new: true });
      res.status(200).json({message: "Autor editado com sucesso!", autores: autorEditado})
    } else {
      res.status(400).json({message: "Nome editado já inserido na base"})
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