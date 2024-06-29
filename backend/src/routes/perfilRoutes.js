import express from "express";
import PerfilAcesso from "../controllers/perfilController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/perfil", PerfilAcesso.listarPerfil, paginar);
routes.post("/perfil", PerfilAcesso.cadastrarPerfil);

export default routes;