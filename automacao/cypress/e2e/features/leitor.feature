Feature: Teste da funcionalidade de Leitor
    Eu, como usuário, quero realizar a listagem, alteração deleção e cadastro de leitor pela API

    @loginAdmin @needLeitor
    Scenario: Cadastrar Leitor com perfil de Administrador
        Given Eu envie uma requisicao para cadastrar um leitor com as informações
        | Cristian Rocha Pidorodeski | cristian.pidorodeski@outlook.com | 08628621911 | 1993-07-09 |
        Then Verifico se o leitor foi cadastrado corretamente

    Scenario: Alterar leitor com perfil de Administrador
        Given Eu obtenho o id do leitor "Cristian Rocha Pidorodeski"
        When Eu envie uma requisicao para alterar o leitor com as informações
        | Cristian Pidoreski | cristian.pidorodeski@outlook.com | 08628621911 | 1993-04-09 |
        Then Verifico se o leitor foi alterado corretamente

    Scenario: Alterar Email do leitor com perfil de Administrador
        Given Eu obtenho o id do leitor "Cristian Pidoreski"
        When Eu envie uma requisicao para alterar o leitor com as informações
        | Cristian Rocha Pidorodeski | cristian@outlook.com | 08628621911 | 1993-04-09 |
        Then Verifico a mensagem "E-mail não pode ser alterado" no "readerPut"

    Scenario: Listar os leitores com perfil de Administrador
        Given Eu realize uma requisição para listar os leitores
        Then Verifico se a listagem da requisição de "reader" é de "3"

    Scenario Outline: Listar os leitores por filtro "<filter>" com perfil de Administrador
        Given Eu realize uma requisicao para listar o leitor pelo filtro "<filter>" com o valor "<value>"
        Then Verifico se a quantidade de leitores listados é de "<result>"
        Examples:
        | filter    | value     | result |
        | nome    | Pidoreski   |   1    | 
        | email   | test02      |   1    |

    Scenario: Deletar o leitor com o perfil de Administrador
        Given Eu obtenho o id do leitor "Cristian Pidoreski"
        When Eu envio uma requisição de Delete para o leitor selecionado
        Then Verifico a mensagem "Leitor deletado com sucesso" no "readerDelete"

    @loginManager
    Scenario: Cadastrar leitor com perfil de Gestor
        Given Eu envie uma requisicao para cadastrar um leitor com as informações
        | Cristian Rocha Pidorodeski | cristian.pidorodeski@outlook.com | 08628621911 | 1993-07-09 |
        Then Verifico a mensagem "Usuario gestor não possui acesso a rota post" no "readerPost"

    Scenario: Alterar leitor com perfil de Gestor
        Given Eu obtenho o id do leitor "Leitor Teste Um"
        When Eu envie uma requisicao para alterar o leitor com as informações
        | Cristian Pidoreski | cristian.pidorodeski@outlook.com | 08628621911 | 1993-04-09 |
        Then Verifico a mensagem "Usuario gestor não possui acesso a rota put" no "readerPut"

    Scenario: Listar os leitores com perfil de Gestor
        Given Eu realize uma requisição para listar os leitores
        Then Verifico se a listagem da requisição de "reader" é de "2"

    Scenario Outline: Listar os leitores por filtro "<filter>" com perfil de Gestor
        Given Eu realize uma requisicao para listar o leitor pelo filtro "<filter>" com o valor "<value>"
        Then Verifico se a quantidade de leitores listados é de "<result>"
        Examples:
        | filter    | value     | result |
        | nome    | Pidoreski   |   0    | 
        | email   | test02      |   1    |

    Scenario: Deletar o leitor com o perfil de Administrador
        Given Eu obtenho o id do leitor "Leitor Teste Um"
        When Eu envio uma requisição de Delete para o leitor selecionado
        Then Verifico a mensagem "Usuario gestor não possui acesso a rota delete" no "readerDelete"
