import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/usuarios", UsuarioController.listarUsuarios, paginar);
routes.get("/usuarios/busca", UsuarioController.listarUsuarioPorFiltro, paginar);
routes.get("/usuarios/:id", UsuarioController.listarUsuarioPorId);
routes.post("/usuarios", UsuarioController.cadastrarUsuario);
routes.delete("/usuarios/:id", UsuarioController.deletarUsuario);

export default routes;