## Configuração:

### Instalação

1. Clone o repositório:
```shell
git clone <url-do-repositorio>
```
2. Instale as dependências executando o comando abaixo na dentro da pasta backend do projeto:
```shell
npm install
```

### Configuração do Banco de Dados

Para o banco, está sendo utilizado o banco de dados na nuvem com MongoDB Atlas, para configurar o banco e a sua conexão siga esses passos:

1. Na pasta do projeto backend, crie um arquivo com o nome '.env' e dentro desse arquivo crie uma variavel com o seguinte nome: DB_CONNECTION_STRING=

2. Acesse este tutorial e siga os passo a passo para criar o seu banco de dados (Atenção ao criar o username e password pois esses dados serão utilizados na configuração da conexão): [Criando um banco de dados na nuvem com MongoDB Atlas](https://sites.google.com/site/proflucasscf/programa%C3%A7%C3%A3o-web-back-end/criando-um-banco-de-dados-na-nuvem-com-mongodb-atlas) 

3 - Após realizar os passos acima, você terá obtido a string de conexão do banco, insira esse texto na variavel de conexão criada no arquivo .env, alterando o campo <username> e <password> pelo usuario e senha que você configurou, devendo ficar da seguinte forma:
```DB_CONNECTION_STRING=mongodb+srv://meu_usuario:minha_senha@cluster0.adozvpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0```

### Populando Banco de Dados

Este passo é opcional, sendo utilizado somente para quem quer realizar a inclusão de dados iniciais no banco de dados

Na pasta do projeto bacend realize a execução do comando a baixo:
```bash
npm run quantity
```

## Projeto:

### Inciando o servidor

Para iniciar o servidor em modo de desenvolvimento, utilize o seguinte comando

```shell
npm run dev
```

Para iniciar o servidor em modo de produção, utilize o seguinte comando

```shell
npm start
```

O servidor estará online no seguinte endereço: http://localhost:3000

## Estrutura das Rotas da API

### Livros

- **GET /livros**: Lista todos os livros.
- **GET /livros/busca**: Lista livros por filtro.
- **GET /livros/:id**: Lista um livro por ID.
- **PUT /livros/:id**: Atualiza um livro por ID.
- **POST /livros**: Cadastra um novo livro.
- **DELETE /livros/:id**: Deleta um livro por ID.
- **DELETE /deletar_livros**: Deleta todos os livros ou aplica uma operação especial de delete.

### Autores

- **GET /autores**: Lista todos os autores.
- **GET /autores/:id**: Lista um autor por ID.
- **POST /autores**: Cadastra um novo autor.
- **DELETE /autores/:id**: Deleta um autor por ID.
- **DELETE /deletar_autores**: Deleta todos os autores ou aplica uma operação especial de delete.

## Bibliotecas Utilizadas

As seguintes bibliotecas foram utilizadas neste projeto:

- **dotenv**: Permite carregar variáveis de ambiente a partir de um arquivo `.env`, facilitando a configuração de variáveis sensíveis e específicas do ambiente.
- **express**: Framework web para Node.js, projetado para construir aplicações e APIs de forma rápida e fácil.
- **mongodb**: Driver oficial do MongoDB para Node.js, permitindo a interação com o banco de dados MongoDB.
- **mongoose**: Biblioteca de modelagem de dados para MongoDB e Node.js, fornecendo uma solução baseada em esquemas para a modelagem dos dados.
- **nodemon**: Ferramenta que ajuda no desenvolvimento de aplicações Node.js reiniciando automaticamente o servidor quando alterações no código são detectadas.
