import express from 'express';
import livros from './livrosRoutes.js';


const routes = (app) => {
    app.use(express.json(), livros);
};

export default routes;