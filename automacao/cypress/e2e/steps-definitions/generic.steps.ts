import { Then } from "@badeball/cypress-cucumber-preprocessor";

Then('Verifico a mensagem {string} no {string}', (errorMessage: string, method: string) =>{
    cy.get<Cypress.Response<any>>(`@${method}`).then((response) => {
        expect(response.body.message).to.eq(errorMessage);
    })
})

Then('Verifico se a listagem da requisição de {string} é de {string}', (service: string, qtd: string, ) =>{
    cy.get<Cypress.Response<any>>(`@${service}GetList`).then((response) => {
        expect(response.body).have.length(+qtd)
    })
})