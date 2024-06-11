import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginar);
routes.get("/livros/busca", LivroController.listarLivroPorFiltro, paginar)
routes.get("/livros/:id", LivroController.listarLivroPorId);
routes.put("/livros/:id", LivroController.atualizarLivros);
routes.post("/livros", LivroController.cadastrarLivros);
routes.delete("/livros/:id", LivroController.deletarLivro);
routes.delete("/deletar_livros", LivroController.specialDeleteLivros);

export default routes;