
const url = `${Cypress.env('apiUrl')}/autor`;

export function insertAuthor(nome: string, nacionalidade: string){
    cy.request({
        method: 'POST',
        url,
        body: {
            nome,
            nacionalidade
        },
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('authorPost')
}

export function listAuthor() {
    return cy.request({
        method: 'GET',
        url,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('authorGetList');
}