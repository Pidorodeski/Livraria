import express from "express";
import PermissaoController from "../controllers/permissaoController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/permissao", PermissaoController.listarPermissao, paginar);

export default routes;