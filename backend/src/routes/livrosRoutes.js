// Primeiro: a requisiçao começa aqui
import express from "express";
import LivroController from "../controllers/livroController.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros);
routes.get("/livros/busca", LivroController.listarLivroPorFiltro)
routes.get("/livros/:id", LivroController.listarLivroPorId);
routes.put("/livros/:id", LivroController.atualizarLivros);
routes.post("/livros", LivroController.cadastrarLivros);
routes.delete("/livros/:id", LivroController.deletarLivro);

export default routes;