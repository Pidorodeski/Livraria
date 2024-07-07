import express from "express";
import LeitorController from "../controllers/leitorController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/leitor", LeitorController.listarLeitores, paginar);
routes.get("/leitor/:id", LeitorController.listarLeitorPorId)
routes.post("/leitor", LeitorController.cadastrarLeitor);
routes.put("/leitor/:id", LeitorController.editarLeitor);
routes.delete("/leitor/:id", LeitorController.deletarLeitor);

export default routes;