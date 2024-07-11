import { Given, When, Then, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { listAuthor } from './autor.steps';

const url = `${Cypress.env('apiUrl')}/livro`;

export function bookPost(
    titulo: string, 
    editora: string,
    observacao: string,
    dataInclusao: string,
    dataPublicacao: string
){
    listAuthor().then((author) =>{
        cy.request({
            method: 'POST',
            url,
            body: {
                titulo,
                editora,
                autor: author.body[0]._id,
                observacao,
                dataInclusao,
                dataPublicacao
            },
            failOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env('JWTToken')}`
            }
        }).as('bookPost')
        
    })
}

export function findBookByName(bookName: string){
    cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/livro/busca?titulo=${bookName}`,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('bookSearchName')
}

export function bookPut(
    id: string,
    titulo: string,
    editora: string,
    observacao: string,
){
    cy.request({
        method: 'PUT',
        url: `${Cypress.env('apiUrl')}/livro/${id}`,
        body: {
            titulo,
            editora,
            observacao,
        },
        failOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('bookPut')  
}

export function findBookByFilter(
    filter: string,
    value: string
){
    cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}/livro/busca?${filter}=${value}`,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('bookSearchFilter')
}

export function bookDelete(id: string){
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}/livro/${id}`,
        failOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('bookDelete')  
}

Given('Eu realize uma requisição para listar os livros', () => {
    cy.request({
        method: 'GET',
        url,
        headers: {
            Authorization: `Bearer ${Cypress.env('JWTToken')}`
        }
    }).as('bookGetList')
});

Given('Eu envie uma requisicao para cadastrar um livro com as informações', (bookTable: any) =>{
    bookPost(
        bookTable.rawTable[0][0],
        bookTable.rawTable[0][1],
        bookTable.rawTable[0][2],
        bookTable.rawTable[0][3],
        bookTable.rawTable[0][4]
    )
})

Given('Eu obtenho o id do livro {string}', (bookName: string) =>{
    findBookByName(bookName)
})

Given('Eu realize uma requisicao para listar o livro pelo filtro {string} com o valor {string}', (filter: string, value: string) =>{
    findBookByFilter(filter, value)
})

When('Eu envie uma requisicao para alterar o livro com as informações', (bookTable: any) =>{
    cy.get<Cypress.Response<any>>("@bookSearchName").then((response) => {
        bookPut(
            response.body[0]._id,
            bookTable.rawTable[0][0],
            bookTable.rawTable[0][1],
            bookTable.rawTable[0][2],
        )
    })
})

When('Eu envio uma requisição de Delete para o livro selecionado', () =>{
    cy.get<Cypress.Response<any>>("@bookSearchName").then((response) => {
        bookDelete(response.body[0]._id)
    })
})

Then('Verifico se o livro foi cadastrado corretamente', () =>{
    cy.get<Cypress.Response<any>>("@bookPost").then((response) => {
        const book = {
            titulo: "O Senhor dos Aneis",
            editora: "Saraiva",
            autor: response.body.livro.autor,
            observacao: "Observação Teste",
            dataInclusao: "2024-07-10T00:00:00.000Z",
            dataPublicacao: "1998-07-10T00:00:00.000Z",
            estaDisponivel: true,
            _id: response.body.livro._id
        }
        expect(response.status).eq(201)
        expect(response.body.message).eq("Livro cadastrado com sucesso")
        expect(response.body.livro).deep.eq(book)
    })
})

Then('Verifico se o livro foi alterado corretamente', () =>{
    cy.get<Cypress.Response<any>>("@bookPut").then((response) => {
        const book = {
            titulo: "O Senhor dos Aneis Nova Edição",
            editora: "Saraiva Livros LTDA",
            autor: response.body.livro.autor,
            observacao: "Alteração Observação Teste",
            dataInclusao: "2024-07-10T00:00:00.000Z",
            dataPublicacao: "1998-07-10T00:00:00.000Z",
            estaDisponivel: true,
            _id: response.body.livro._id
        }
        expect(response.status).eq(200)
        expect(response.body.message).eq("Livro atualizado com sucesso")
        expect(response.body.livro).deep.eq(book)
    })
})

Then('Verifico se a listagem da requisição dos livros é de {string}', (qtd: string) =>{
    cy.get<Cypress.Response<any>>("@bookGetList").then((response) => {
        expect(response.body).have.length(+qtd)
    })
})

Then('Verifico se a quantidade de livros listados é de {string}', (qtd: string) =>{
    cy.get<Cypress.Response<any>>("@bookSearchFilter").then((response) => {
        expect(response.body).have.length(+qtd)
    })
})

Then('Verifico a mensagem {string} no {string}', (errorMessage: string, method: string) =>{
    cy.get<Cypress.Response<any>>(`@book${method}`).then((response) => {
        expect(response.body.message).to.eq(errorMessage);
    })
})