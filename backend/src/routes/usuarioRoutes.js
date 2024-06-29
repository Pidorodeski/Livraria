import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import paginar from "../middlewares/paginar.js";
import Autenticado from "../middlewares/autenticado.js";

const routes = express.Router();
routes.use(Autenticado)

routes.get("/usuarios", UsuarioController.listarUsuarios, paginar);
routes.get("/usuarios/:id", UsuarioController.listarUsuarioPorId);
routes.post("/usuarios", UsuarioController.cadastrarUsuario);
routes.put("/usuarios/:id", UsuarioController.editarUsuario);
routes.delete("/usuarios/:id", UsuarioController.deletarUsuario);

export default routes;