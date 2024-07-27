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
    }).as('readerPost')
}

export function findReaderUserByFilter(
    filter: string,
    value: string
){
    cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/leitor/busca?${filter}=${value}`,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('readerSearchFilter')
}

export function readerPut(
    id: string,
    nome: string,
    email: string,
    cpf: string,
    dataNascimento: string,
){
    cy.request({
        method: 'PUT',
        url: `${Cypress.env('apiUrl')}/leitor/${id}`,
        body: {
            nome,
            email,
            cpf,
            dataNascimento
        },
        failOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('readerPut')  
}

export function readerDelete(id: string){
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/leitor/${id}`,
        failOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('readerDelete')  
}

Given('Eu realize uma requisição para listar os leitores', () => {
    cy.request({
        method: 'GET',
        url,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('readerGetList')
});


Given('Eu envie uma requisicao para cadastrar um leitor com as informações', (leitorTable: any) =>{
    insertLeitor(
        leitorTable.rawTable[0][0],
        leitorTable.rawTable[0][1],
        leitorTable.rawTable[0][2],
        leitorTable.rawTable[0][3]
    )
})

Given('Eu obtenho o id do leitor {string}', (name: string) =>{
    findReaderUserByFilter("nome", name)
})

Given('Eu realize uma requisicao para listar o leitor pelo filtro {string} com o valor {string}', (filter: string, value: string) =>{
    findReaderUserByFilter(filter, value)
})

When('Eu envie uma requisicao para alterar o leitor com as informações', (readerable: any) =>{
    cy.get<Cypress.Response<any>>("@readerSearchFilter").then((response) => {
        console.log(response);
        
        readerPut(
            response.body[0]._id,
            readerable.rawTable[0][0],
            readerable.rawTable[0][1],
            readerable.rawTable[0][2],
            readerable.rawTable[0][3],
        )
    })
})

When('Verifico se o leitor foi alterado corretamente', () =>{
    cy.get<Cypress.Response<any>>("@readerPut").then((response) => {
        const reader = {
            cpf: "08628621911",
            dataNascimento: "1993-04-09T00:00:00.000Z",
            email: "cristian.pidorodeski@outlook.com",
            nome: "Cristian Pidoreski",
            _id: response.body.leitor._id
        }
        expect(response.status).eq(201)
        expect(response.body.message).eq("Leitor atualizado com sucesso")
        expect(response.body.leitor).deep.eq(reader)
    })
})

When('Eu envio uma requisição de Delete para o leitor selecionado', () =>{
    cy.get<Cypress.Response<any>>("@readerSearchFilter").then((response) => {
        readerDelete(response.body[0]._id)
    })
})

Then('Verifico se a quantidade de leitores listados é de {string}', (qtd: string) =>{
    cy.get<Cypress.Response<any>>("@readerSearchFilter").then((response) => {
        expect(response.body).have.length(+qtd)
    })
})

Then('Verifico se o leitor foi cadastrado corretamente', () =>{
    cy.get<Cypress.Response<any>>("@readerPost").then((response) => {
        const leitor = {
            cpf: "08628621911",
            dataNascimento: "1993-07-09T00:00:00.000Z",
            email: "cristian.pidorodeski@outlook.com",
            nome: "Cristian Rocha Pidorodeski",
            _id: response.body.leitor._id
        }
        expect(response.status).eq(201)
        expect(response.body.message).eq("Usuario Leitor cadastrado com sucesso")
        expect(response.body.leitor).deep.eq(leitor)
    })
})