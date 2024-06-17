import EmprestimoController from "../controllers/emprestimoController.js"
import express from "express";

const routes = express.Router();

routes.post("/emprestimo/:idLivro/:idUsuario", EmprestimoController.realizarEmprestimo);

export default routes;