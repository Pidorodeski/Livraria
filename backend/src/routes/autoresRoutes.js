import express from "express";
import AutorController from "../controllers/autoresController.js";
import paginar from "../middlewares/paginar.js";
import autenticado from "../middlewares/autenticado.js"

const routes = express.Router();

routes.use(autenticado)

routes.get("/autor", AutorController.listarAutores, paginar);
routes.get("/autor/:id", AutorController.listarAutorPorId);
routes.post("/autor", AutorController.cadastrarAutor);
routes.put("/autor/:id", AutorController.editarAutor);
routes.delete("/autor/:id", AutorController.deletarAutor);

export default routes;