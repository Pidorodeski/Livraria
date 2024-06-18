import express from 'express';
import livros from './livrosRoutes.js';
import autores from './autoresRoutes.js';
import usuarios from './usuarioRoutes.js';
import emprestimo from './emprestimoRoutes.js';


const routes = (app) => {
    app.use(
        express.json(), 
        livros,
        autores,
        usuarios,
        emprestimo,
    );
};

export default routes;