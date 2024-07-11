import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { PostResult } from './models/post-result';

const url = `${Cypress.env('apiUrl')}/auth/login`;

export function login(perfil: string): void {
    cy.fixture('auth').then((authData) => {
        let email, password;

        if (perfil === 'Admin') {
            email = authData.admin_email;
            password = authData.admin_password;
        } else if (perfil === 'Gestor') {
            email = authData.gestor_email;
            password = authData.gestor_password;
        } else {
            throw new Error(`Perfil '${perfil}' não reconhecido`);
        }

        
        cy.request({
            method: 'POST',
            url,
            body: {
                email: email,
                senha: password
            }
        }).as('login').then((token) =>{
            Cypress.env('JWTToken', token.body.accessToken)
        })
    });
  }

Given('Eu faça a autenticação com as credenciais de {string}', (perfil: string) => {
    login(perfil)       
});

Then('Verifico se o retorno do login é o código {string}', (code: string) => {
    cy.get<Cypress.Response<any>>("@login").then((response) => {
        expect(response.status).eq(+code)
    })
});

Given('Eu faca a autenticação com o email {string} e senha {string}', (email: string, password: string) => {
    cy.request({
        method: 'POST',
        url,
        failOnStatusCode: false,
        body: {
            email: email,
            senha: password
        }
    }).as('login')
});