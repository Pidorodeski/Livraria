import { Before } from '@badeball/cypress-cucumber-preprocessor';
import { insertAuthor } from './autor.steps';
import { bookPost } from './livro.steps';

const url = `${Cypress.env('apiUrl')}/auth/login`;

export function insertBooksCollections(): void {
    insertAuthor('Autor 001', 'Brasileiro');
    bookPost('1Q84', 'Shinchosha Publishing', 'Romance distópico de Haruki Murakami', '2024-07-10', '2009-05-29'),
    bookPost('Noruwei no Mori (Norwegian Wood)', 'Kodansha', 'Romance de Haruki Murakami', '2024-07-10', '1987-08-28'),
    bookPost('Kokoro', 'Iwanami Shoten', 'Clássico da literatura japonesa de Natsume Soseki', '2024-07-10', '1914-01-20'),
    bookPost('Genji Monogatari (O Conto de Genji)', 'Tosa Nikki', 'Considerado o primeiro romance do mundo, escrito por Murasaki Shikibu', '2024-07-10', '1008-07-10')
}

before (() =>{
    cy.log("Drop nas collections do mongodb")
    cy.dropCollection('livros');
    cy.dropCollection('autores');
    cy.dropCollection('emprestimos');
    cy.dropCollection('leitores');
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
            Cypress.env('JWTToken', token.body.accessToken)
        })
    });
})

Before({tags: '@loginManager'}, () =>{
    cy.fixture('auth').then((authData) => {
        let email = authData.gestor_email;
        let password = authData.gestor_password;

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
})

Before({tags: '@needBooks'}, () =>{
    insertBooksCollections();
})