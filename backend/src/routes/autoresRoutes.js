import express from "express";
import AutorController from "../controllers/autoresController.js";

const routes = express.Router();

routes.get("/autores", AutorController.listarAutores);
routes.get("/autores/:id", AutorController.listarAutorPorId);
routes.post("/autores", AutorController.cadastrarAutor);
routes.delete("/autores/:id", AutorController.deletarAutor);
routes.delete("/deletar_autores", AutorController.specialDeleteAutores);

export default routes;