import express from 'express';
import livros from './livrosRoutes.js';
import autores from './autoresRoutes.js';
import usuarios from './usuarioRoutes.js';
import emprestimo from './emprestimoRoutes.js';
import perfil from './perfilRoutes.js';
import auth from './authRoutes.js';
import leitor from './leitorRoutes.js';
import permissao from './permissaoRoutes.js';
import cors from 'cors';

const routes = (app) => {
    app.use(
        cors(),
        express.json(), 
        auth,
        livros,
        leitor,
        autores,
        usuarios,
        emprestimo,
        permissao,
        perfil
    );
};

export default routes;