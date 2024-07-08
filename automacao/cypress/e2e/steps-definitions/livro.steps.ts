import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

const url = `${Cypress.env('apiUrl')}/livro`;

Given('Eu realize uma requisição para listar os livros', () => {
    cy.request({
        method: 'GET',
        url,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTAdminToken')}`
        }
    }).as('listagemLivros')
});