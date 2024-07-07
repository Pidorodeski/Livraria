import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginar.js";
import perfil from "../middlewares/perfil.js"
import autenticado from "../middlewares/autenticado.js";

const routes = express.Router();
routes.use(autenticado)

routes.get("/livro", perfil(["admin"]), LivroController.listarLivros, paginar);
routes.get("/livro/busca", LivroController.listarLivroPorFiltro, paginar)
routes.get("/livro/:id", LivroController.listarLivroPorId);
routes.put("/livro/:id", LivroController.atualizarLivros);
routes.post("/livro", LivroController.cadastrarLivros);
routes.delete("/livro/:id", LivroController.deletarLivro);

export default routes;