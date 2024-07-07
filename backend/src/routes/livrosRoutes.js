import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginar.js";
import perfil from "../middlewares/perfil.js"
import autenticado from "../middlewares/autenticado.js";

const routes = express.Router();
routes.use(autenticado)

routes.get("/livro", perfil(["admin", "gestor"]), LivroController.listarLivros, paginar);
routes.get("/livro/busca", perfil(["admin", "gestor"]), LivroController.listarLivroPorFiltro, paginar)
routes.get("/livro/:id", perfil(["admin", "gestor"]), LivroController.listarLivroPorId);
routes.put("/livro/:id", perfil(["admin", "gestor"]), LivroController.atualizarLivros);
routes.post("/livro", perfil(["admin", "gestor"]), LivroController.cadastrarLivros);
routes.delete("/livro/:id", perfil(["admin", "gestor"]), LivroController.deletarLivro);

export default routes;