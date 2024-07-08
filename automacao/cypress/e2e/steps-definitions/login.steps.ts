import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';

const url = `${Cypress.env('apiUrl')}/auth/login`;

export function login(perfil: string): void {
    let email, password;
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
        }).then((token) =>{
            console.log(token);
            
            //Cypress.env('JWTToken', token.body.a)
        })
    });
  }

Given('Eu faça a autenticação com as credenciais de {string}', (perfil: string) => {
    login(perfil)
    return true
});