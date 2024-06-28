import express from "express";
import AutorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";
import Autenticado from "../middlewares/autenticado.js";

const routes = express.Router();

routes.get("/autores", AutorController.listarAutores, paginar);
routes.get("/autores/:id", AutorController.listarAutorPorId);
routes.post("/autores", AutorController.cadastrarAutor);
routes.put("/autores/:id", AutorController.editarAutor);
routes.delete("/autores/:id", AutorController.deletarAutor);

export default routes;