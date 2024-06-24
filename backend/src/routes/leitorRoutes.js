import express from "express";
import LeitorController from "../controllers/leitorController.js";
import paginar from "../middlewares/paginar.js";
import Autenticado from '../middlewares/autenticado.js'

const routes = express.Router();
routes.use(Autenticado);

routes.get('/leitor', )