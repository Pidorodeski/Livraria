Feature: Teste da funcionalidade de Livros
    Eu, como usuário, quero realizar a listagem, alteração deleção e cadastro de livros pela API

    @loginAdmin @needBooks
    Scenario: Cadastrar livro com perfil de Administrador
        Given Eu envie uma requisicao para cadastrar um livro com as informações
        | O Senhor dos Aneis | Saraiva | Observação Teste | 2024-07-10 | 1998-07-10 |
        Then Verifico se o livro foi cadastrado corretamente

    Scenario: Alterar livro com perfil de Administrador
        Given Eu obtenho o id do livro "O Senhor dos Aneis"
        When Eu envie uma requisicao para alterar o livro com as informações
        | O Senhor dos Aneis Nova Edição | Saraiva Livros LTDA | Alteração Observação Teste |
        Then Verifico se o livro foi alterado corretamente

    Scenario: Listar os livros com perfil de Administrador
        Given Eu realize uma requisição para listar os livros
        Then Verifico se a listagem da requisição de "book" é de "5"

    Scenario Outline: Listar os livros por filtro "<filter>" com perfil de Administrador
        Given Eu realize uma requisicao para listar o livro pelo filtro "<filter>" com o valor "<value>"
        Then Verifico se a quantidade de livros listados é de "<result>"
        Examples:
        | filter    | value     | result |
        | titulo    | Senhor    |   1    | 
        | editora   | nikki     |   1    |
        | Autor     | Autor 001 |   5    |

    Scenario: Deletar um livro com o perfil de Administrador
        Given Eu obtenho o id do livro "O Senhor dos Aneis Nova Edição"
        When Eu envio uma requisição de Delete para o livro selecionado
        Then Verifico a mensagem "livro excluído com sucesso" no "bookDelete"
    
    @loginManager
    Scenario: Cadastrar livro com perfil de Gestor
        Given Eu envie uma requisicao para cadastrar um livro com as informações
        | O Senhor dos Aneis | Saraiva | Observação Teste | 2024-07-10 | 1998-07-10 |
        Then Verifico a mensagem "Usuario gestor não possui acesso a rota post" no "bookPost"

    Scenario: Alterar livro com perfil de Gestor
        Given Eu obtenho o id do livro "Kokoro"
        When Eu envie uma requisicao para alterar o livro com as informações
        | Kokoro Nova Edição | Shoten | Alteração Observação Teste |
        Then Verifico a mensagem "Usuario gestor não possui acesso a rota put" no "bookPut"

    Scenario: Listar os livros com perfil de Gestor
        Given Eu realize uma requisição para listar os livros
        Then Verifico se a listagem da requisição de "book" é de "4"

    Scenario Outline: Listar os livros por filtro "<filter>" com perfil de Gestor
        Given Eu realize uma requisicao para listar o livro pelo filtro "<filter>" com o valor "<value>"
        Then Verifico se a quantidade de livros listados é de "<result>"
        Examples:
        | filter    | value     | result |
        | titulo    | 1Q84      |   1    | 
        | titulo    | Senhor    |   0    | 
        | editora   | nikki     |   1    |
        | Autor     | Autor 001 |   4    |

    Scenario: Deletar um livro com o perfil de Gestor
        Given Eu obtenho o id do livro "1Q84"
        When Eu envio uma requisição de Delete para o livro selecionado
        Then Verifico a mensagem "Usuario gestor não possui acesso a rota delete" no "bookDelete"