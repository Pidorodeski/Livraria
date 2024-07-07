import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import paginar from "../middlewares/paginar.js";
import Autenticado from "../middlewares/autenticado.js";
import perfil from "../middlewares/perfil.js"

const routes = express.Router();
routes.use(Autenticado);

routes.get("/usuario", perfil(["admin", "gestor"]), UsuarioController.listarUsuarios, paginar);
routes.get("/usuario/:id", perfil(["admin", "gestor"]), UsuarioController.listarUsuarioPorId);
routes.post("/usuario", perfil(["admin", "gestor"]), UsuarioController.cadastrarUsuario);
routes.put("/usuario/:id", perfil(["admin", "gestor"]), UsuarioController.editarUsuario);
routes.delete("/usuario/:id", perfil(["admin", "gestor"]), UsuarioController.deletarUsuario);

export default routes;