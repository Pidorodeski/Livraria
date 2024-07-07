import express from "express";
import UsuarioController from "../controllers/usuarioController.js";
import paginar from "../middlewares/paginar.js";
import Autenticado from "../middlewares/autenticado.js";

const routes = express.Router();
routes.use(Autenticado);

routes.get("/usuario", UsuarioController.listarUsuarios, paginar);
routes.get("/usuario/:id",  UsuarioController.listarUsuarioPorId);
routes.post("/usuario", UsuarioController.cadastrarUsuario);
routes.put("/usuario/:id",  UsuarioController.editarUsuario);
routes.delete("/usuario/:id",  UsuarioController.deletarUsuario);

export default routes;