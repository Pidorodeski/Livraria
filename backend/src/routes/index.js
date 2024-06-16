import express from 'express';
import livros from './livrosRoutes.js';
import autores from './autoresRoutes.js';
import usuarios from './usuarioRoutes.js';


const routes = (app) => {
    app.use(
        express.json(), 
        livros,
        autores,
        usuarios,
    );
};

export default routes;