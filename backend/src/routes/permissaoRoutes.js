import express from "express";
import PermissaoController from "../controllers/permissaoController.js";
import paginar from "../middlewares/paginar.js";
import perfil from "../middlewares/perfil.js"
import Autenticado from "../middlewares/autenticado.js";



const routes = express.Router();
routes.use(Autenticado);

routes.get("/permissao", perfil(["admin", "gestor"]), PermissaoController.listarPermissao, paginar);

export default routes;