import EmprestimoController from "../controllers/emprestimoController.js"
import express from "express";
import paginar from "../middlewares/paginar.js"

const routes = express.Router();

routes.get("/emprestimo", EmprestimoController.listarEmprestimos, paginar);
routes.post("/emprestimo", EmprestimoController.realizarEmprestimo);

export default routes;