import express from "express";
import AutorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";
import autenticado from "../middlewares/autenticado.js"
import perfil from "../middlewares/perfil.js"

const routes = express.Router();
routes.use(autenticado)

routes.get("/autor", perfil(["admin", "gestor"]), AutorController.listarAutores, paginar);
routes.get("/autor/busca", perfil(["admin", "gestor"]), AutorController.listarAutoresPorFiltro, paginar)
routes.get("/autor/:id", perfil(["admin", "gestor"]), AutorController.listarAutorPorId);
routes.post("/autor", perfil(["admin", "gestor"]), AutorController.cadastrarAutor);
routes.put("/autor/:id", perfil(["admin", "gestor"]), AutorController.editarAutor);
routes.delete("/autor/:id", perfil(["admin", "gestor"]), AutorController.deletarAutor);

export default routes;