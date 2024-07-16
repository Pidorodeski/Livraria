Feature: Teste da funcionalidade de Livros
    Eu, como usuário, quero realizar a listagem, alteração deleção e cadastro de leitor pela API

    @loginAdmin @needLeitor
    Scenario: Cadastrar Leitor com perfil de Administrador
        Given Eu envie uma requisicao para cadastrar um leitor com as informações
        | Cristian Rocha Pidorodeski | cristian.pidorodeski@outlook.com | 08628621911 | 1993-07-09 |
        Then Verifico se o leitor foi cadastrado corretamente