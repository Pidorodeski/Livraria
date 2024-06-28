import express from "express";
import PerfilAcesso from "../controllers/perfilController.js";
import paginar from "../middlewares/paginar.js";
import Autenticado from "../middlewares/autenticado.js";

const routes = express.Router();

routes.get("/perfil", PerfilAcesso.listarPerfil, paginar)

export default routes;