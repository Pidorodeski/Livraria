Feature: Teste de API da funcionalidade de autor
    Eu, como usuário, quero realizar a listagem, alteração deleção e cadastro de autor pela API

    @loginAdmin @needAuthor
    Scenario: Cadastrar Autor com perfil de Administrador
        Given Eu envie uma requisição para cadastrar um Autor com as informações
        | Machado de Assis | Brasileiro |
        Then Verifico se o autor foi cadastrado corretamente

    Scenario: Cadastrar Autor com nome repedido com perfil de Administrador
        Given Eu envie uma requisição para cadastrar um Autor com as informações
        | Machado de Assis | Brasileiro |
        Then Verifico a mensagem "Nome inserido já cadastrado!" no "authorPost"

    Scenario: Atualizar Autor com perfil de Administrador
        Given Eu obtenho o id do Autor "Machado de Assis"
        When Eu envie uma requisicao para alterar o autor com as informações
        | Jiraya Sennin | Japones |
        Then Verifico se o autor foi alterado corretamente

    Scenario: Atualizar nome do Autor para um valor ja em uso com perfil de Administrador
        Given Eu obtenho o id do Autor "Jiraya Sennin"
        When Eu envie uma requisicao para alterar o autor com as informações
        | Autor 001 | Japones |
        Then Verifico a mensagem "Nome editado já inserido na base" no "authorPut"

    Scenario: Listar os autores com perfil de Administrador
        Given Eu realize uma requisição para listar os autores
        Then Verifico se a listagem da requisição de "author" é de "3"
    
    Scenario Outline: Listar os autores por filtro "<filter>" com perfil de Administrador
        Given Eu realize uma requisicao para listar o autor pelo filtro "<filter>" com o valor "<value>"
        Then Verifico se a quantidade de autor listados é de "<result>"
        Examples:
        | filter        | value     | result |
        | nome          | Jiraya    |   1    | 
        | nome          | Machado   |   0    |
        | nacionalidade | Japones   |   1    |

    Scenario: Deletar Autor com perfil de Administrador
        Given Eu obtenho o id do Autor "Jiraya Sennin"
        When Eu envio uma requisição de Delete para o autor selecionado
        Then Verifico a mensagem "Autor excluído com sucesso" no "authorDelete"

    @loginManager
    Scenario: Cadastrar Autor com perfil de Gestor
        Given Eu envie uma requisição para cadastrar um Autor com as informações
        | Machado de Assis | Brasileiro |
        Then Verifico a mensagem "Usuario gestor não possui acesso a rota post" no "authorPost"

    Scenario: Alterar livro com perfil de Gestor
        Given Eu obtenho o id do Autor "Autor 001"
        When Eu envie uma requisicao para alterar o autor com as informações
        | Jiraya Sennin | Japones |
        Then Verifico a mensagem "Usuario gestor não possui acesso a rota put" no "authorPut"

    Scenario: Listar os autores com perfil de Gestor
        Given Eu realize uma requisição para listar os autores
        Then Verifico se a listagem da requisição de "author" é de "2"

    Scenario Outline: Listar os autores por filtro "<filter>" com perfil de Gestor
        Given Eu realize uma requisicao para listar o autor pelo filtro "<filter>" com o valor "<value>"
        Then Verifico se a quantidade de autor listados é de "<result>"
        Examples:
        | filter        | value         | result |
        | nome          | Autor         |   2    | 
        | nacionalidade | Brasileiro    |   1    | 
    
    Scenario: Deletar Autor com perfil de Gestor
        Given Eu obtenho o id do Autor "Autor 001"
        When Eu envio uma requisição de Delete para o autor selecionado
        Then Verifico a mensagem "Usuario gestor não possui acesso a rota delete" no "authorDelete" 