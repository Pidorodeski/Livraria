import express from "express";
import LeitorController from "../controllers/leitorController.js";
import paginar from "../middlewares/paginar.js";
import perfil from "../middlewares/perfil.js"
import autenticado from "../middlewares/autenticado.js";

const routes = express.Router();
routes.use(autenticado)

routes.get("/leitor", perfil(["admin", "gestor"]), LeitorController.listarLeitores, paginar);
routes.get("/leitor/:id", perfil(["admin", "gestor"]), LeitorController.listarLeitorPorId)
routes.post("/leitor", perfil(["admin", "gestor"]), LeitorController.cadastrarLeitor);
routes.put("/leitor/:id", perfil(["admin", "gestor"]), LeitorController.editarLeitor);
routes.delete("/leitor/:id", perfil(["admin", "gestor"]), LeitorController.deletarLeitor);

export default routes;