import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
const url = `${Cypress.env('apiUrl')}/leitor`;

export function insertLeitor(nome: string, email: string, cpf: string, dataNascimento: string){
    cy.request({
        method: 'POST',
        url,
        failOnStatusCode: false,
        body: {
            nome,
            email,
            cpf,
            dataNascimento
        },
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('leitorPost')
}

Given('Eu envie uma requisicao para cadastrar um leitor com as informações', (leitorTable: any) =>{
    insertLeitor(
        leitorTable.rawTable[0][0],
        leitorTable.rawTable[0][1],
        leitorTable.rawTable[0][2],
        leitorTable.rawTable[0][3]
    )
})

Then('Verifico se o leitor foi cadastrado corretamente', () =>{
    cy.get<Cypress.Response<any>>("@leitorPost").then((response) => {
        const leitor = {
            
        }
    })
})