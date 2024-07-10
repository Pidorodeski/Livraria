Feature: Teste de login no ambiente
    Eu, como usuário, realizar a autenticação no sistema pela API
    
    Scenario: Realizar a autenticação com o usuario perfil Administrador
        Given Eu faça a autenticação com as credenciais de "Admin"
        Then Verifico se o retorno do login é o código "200"

    Scenario: Realizar a autenticação com o usuario perfil Gestor
        Given Eu faça a autenticação com as credenciais de "Gestor"
        Then Verifico se o retorno do login é o código "200"

    Scenario: Realizar a autenticação com o usuario Incorreto
        Given Eu faca a autenticação com o email "incorreto@teste.com" e senha "error"
        Then Verifico se o retorno do login é o código "400"

    Scenario: Realizar a autenticação com a senha incorreta
        Given Eu faca a autenticação com o email "cristian.pidorodeski@outlook.com" e senha "error"
        Then Verifico se o retorno do login é o código "400"