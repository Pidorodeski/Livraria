import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/usuarios", UsuarioController.listarUsuarios);
routes.post("/usuarios", UsuarioController.cadastrarUsuario);

export default routes;