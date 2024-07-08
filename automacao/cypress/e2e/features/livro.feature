Feature: Teste da funcionalidade de Livros
    Eu, como usuário, realizar a listagem, alteração e cadastro de livros pela API

    @loginAdmin
    Scenario: Listar os livros com perfil de Administrador
        Given Eu realize uma requisição para listar os livros
        Then 