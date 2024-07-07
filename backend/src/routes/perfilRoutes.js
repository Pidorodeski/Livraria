import express from "express";
import PerfilAcesso from "../controllers/perfilController.js";
import paginar from "../middlewares/paginar.js";
import perfil from "../middlewares/perfil.js"
import Autenticado from "../middlewares/autenticado.js";

const routes = express.Router();
routes.use(Autenticado);

routes.get("/perfil", perfil(["admin", "gestor"]), PerfilAcesso.listarPerfil, paginar);
routes.get("/perfil/:id", perfil(["admin", "gestor"]), PerfilAcesso.listarPerfilPorId);

export default routes;