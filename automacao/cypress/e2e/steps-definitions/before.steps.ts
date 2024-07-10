import { Before } from '@badeball/cypress-cucumber-preprocessor';

const url = `${Cypress.env('apiUrl')}/auth/login`;

before (() =>{
    cy.log("Oi, eu sou o before")
    cy.dropCollection('livros');
    cy.dropCollection('autores');
    cy.dropCollection('emprestimos');
    cy.dropCollection('leitores');
    //cy.dropCollection('permissoes');
    //cy.dropCollection('usuarios');
})

Before({tags: '@loginAdmin'}, () =>{
    cy.fixture('auth').then((authData) => {
        let email = authData.admin_email;
        let password = authData.admin_password;

        cy.request({
            method: 'POST',
            url,
            body: {
                email: email,
                senha: password
            }
        }).as('login').then((token) =>{
            Cypress.env('JWTAdminToken', token.body.accessToken)
        })
    });
})


Before({tags: '@dropDatabase'}, () =>{
    cy.dropCollection('livros', 'autores');
})