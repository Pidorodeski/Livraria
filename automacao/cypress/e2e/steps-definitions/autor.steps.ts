import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
const url = `${Cypress.env('apiUrl')}/autor`;

export function insertAuthor(nome: string, nacionalidade: string){
    cy.request({
        method: 'POST',
        url,
        failOnStatusCode: false,
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

export function findAuthorByFilter(filter: string, value: string){
    cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/autor/busca?${filter}=${value}`,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('findAuthorByFilter')
}

export function authorPut(
    id: string,
    nome: string,
    nacionalidade: string,
){
    cy.request({
        method: 'PUT',
        url: `${Cypress.env('apiUrl')}/autor/${id}`,
        body: {
            nome,
            nacionalidade
        },
        failOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('authorPut')  
}

export function authorDelete(id: string){
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/autor/${id}`,
        failOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('authorDelete')  
}

Given('Eu envie uma requisição para cadastrar um Autor com as informações', (bookTable: any) => {
    insertAuthor(
        bookTable.rawTable[0][0],
        bookTable.rawTable[0][1]
        )
});

Given('Eu obtenho o id do Autor {string}', (authorName: string) =>{
    findAuthorByFilter("nome", authorName);
})

Given('Eu realize uma requisicao para listar o autor pelo filtro {string} com o valor {string}', (filter: string, value: string) =>{
    findAuthorByFilter(filter, value);
})

Given('Eu realize uma requisição para listar os autores', () =>{
    cy.request({
        method: 'GET',
        url,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('authorGetList')
})

When('Eu envie uma requisicao para alterar o autor com as informações', (bookTable: any) =>{
    cy.get<Cypress.Response<any>>("@findAuthorByFilter").then((response) => {
        authorPut(
            response.body[0]._id,
            bookTable.rawTable[0][0],
            bookTable.rawTable[0][1]
        )
    })
})

When('Eu envio uma requisição de Delete para o autor selecionado', () =>{
    cy.get<Cypress.Response<any>>("@findAuthorByFilter").then((response) => {
        authorDelete(response.body[0]._id)
    })
})

Then('Verifico se o autor foi cadastrado corretamente', ()=>{
    cy.get<Cypress.Response<any>>("@authorPost").then((response) => {
        const autor = {
            nome: "Machado de Assis",
            nacionalidade: "Brasileiro",
            _id: response.body.autores._id
        }
        expect(response.status).eq(201)
        expect(response.body.message).eq("Autor cadastrado com sucesso")
        expect(response.body.autores).deep.eq(autor)
    })
})

Then('Verifico se o autor foi alterado corretamente', ()=>{
    cy.get<Cypress.Response<any>>("@authorPut").then((response) => {
        const autor = {
            nome: "Jiraya Sennin",
            nacionalidade: "Japones",
            _id: response.body.autores._id
        }
        expect(response.status).eq(200)
        expect(response.body.message).eq("Autor editado com sucesso!")
        expect(response.body.autores).deep.eq(autor)
    })
})

Then('Verifico se a quantidade de autor listados é de {string}', (qtd: string) =>{
    cy.get<Cypress.Response<any>>("@findAuthorByFilter").then((response) => {
        expect(response.body).have.length(+qtd)
    })
})