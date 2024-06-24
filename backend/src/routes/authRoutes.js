import express from "express";
import AuthController from "../controllers/authController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.post('/auth/login', AuthController.authLogin)

export default routes;