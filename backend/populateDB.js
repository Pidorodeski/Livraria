import mongoose from "mongoose";
import "dotenv/config";
import autores from './src/models/Autor.js';
import livro from "./src/models/Livro.js";
import usuario from "./src/models/Usuario.js";
import perfil from "./src/models/PerfilAcesso.js";
import permissao from "./src/models/Permissao.js";
import emprestimo from "./src/models/Emprestimo.js";
import leitor from "./src/models/Leitor.js";
import bcrypt from 'bcryptjs';


// Conectar-se ao banco de dados MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(async () => {
        console.log('Conectado ao MongoDB');

        // Limpar as coleções
        await Promise.all([
            autores.deleteMany({}),
            emprestimo.deleteMany({}),
            leitor.deleteMany({}),
            livro.deleteMany({}),
            perfil.deleteMany({}),
            usuario.deleteMany({}),
            permissao.deleteMany({})
        ]);
        console.log('Dados antigos removidos das coleções');

        const perfilAcesso = [
            {nomePerfil: 'admin', status: 1},
            {nomePerfil: 'gestor', status: 2},
        ]

        // Inserir dados do perfil de acesso
        const perfisInseridos = await perfil.insertMany(perfilAcesso);
        console.log('Realizado insert dos dados de perfil sucesso');


        const perfilId = perfisInseridos.map(perfil => perfil._id);

        const adminPerfil = perfisInseridos.find(perfil => perfil.nomePerfil === 'admin');
        const gestorPerfil = perfisInseridos.find(perfil => perfil.nomePerfil === 'gestor');


        const hashSenha1 = await bcrypt.hash("123456", 10); // Gera o hash da senha com 10 salt rounds
        const hashSenha2 = await bcrypt.hash("123321", 10); // Gera o hash da senha com 10 salt rounds

        const dadosUsuarios = [
            {nome: 'Cristian Rocha Pidorodeski', email: "cristian.pidorodeski@outlook.com", senha: hashSenha1, cpf: '08628621911', dataNascimento: '1993-07-29', perfil: adminPerfil.id},
            {nome: 'Daniela Ferreira Oliveira', email: "daniela.ferreira@outlook.com", senha: hashSenha2, cpf: '08792916996', dataNascimento: '1993-07-29', perfil: gestorPerfil.id},
        ]

        // Inserir os dados dos autores e capturar os IDs gerados
        await usuario.insertMany(dadosUsuarios);
        console.log('Realizado insert dos dados de usuário com sucesso');

        // Inserir os dados das permissões
        const permissoes = [
            {
                perfil: adminPerfil._id,
                recursos: [
                    { nomeRecurso: "autor", acoes: { get: true, post: true, put: true, delete: true } },
                    { nomeRecurso: "livro", acoes: { get: true, post: true, put: true, delete: true } },
                    { nomeRecurso: "leitor", acoes: { get: true, post: true, put: true, delete: true } },
                    { nomeRecurso: "usuario", acoes: { get: true, post: true, put: true, delete: true } },
                    { nomeRecurso: "perfil", acoes: { get: true, post: true, put: true, delete: true } },
                    { nomeRecurso: "emprestimo", acoes: { get: true, post: true, put: true, delete: true } }
                ]
            },
            {
                perfil: gestorPerfil._id,
                recursos: [
                    { nomeRecurso: "autor", acoes: { get: true, post: false, put: false, delete: false } },
                    { nomeRecurso: "livro", acoes: { get: true, post: false, put: false, delete: false } },
                    { nomeRecurso: "leitor", acoes: { get: true, post: false, put: false, delete: false } },
                    { nomeRecurso: "usuario", acoes: { get: true, post: false, put: false, delete: false } },
                    { nomeRecurso: "perfil", acoes: { get: true, post: false, put: false, delete: false } },
                    { nomeRecurso: "emprestimo", acoes: { get: true, post: false, put: false, delete: false } }

                ]
            }
        ];

        // Inserir permissões
        await permissao.insertMany(permissoes);
        console.log('Realizado insert dos dados de permissões com sucesso');


        // Array de dados a serem inseridos
        const dadosAutores = [
            { nome: 'J. R. R. Tolkien', nacionalidade: 'Inglaterra' },
            { nome: 'Dan Brown', nacionalidade: 'Estados Unidos' },
            { nome: 'J. K. Rowling', nacionalidade: 'Reino Unido' },
            { nome: 'George Orwell', nacionalidade: 'Reino Unido' },
            { nome: 'Jane Austen', nacionalidade: 'Reino Unido' },
            { nome: 'Antoine de Saint-Exupéry', nacionalidade: 'França' },
            { nome: 'Miguel de Cervantes', nacionalidade: 'Espanha' },
            { nome: 'Franz Kafka', nacionalidade: 'República Tcheca' },
        ];

        // Inserir os dados dos autores e capturar os IDs gerados
        const autoresInseridos = await autores.insertMany(dadosAutores);
        console.log('Realizado insert dos dados dos autores com sucesso');

        // Mapear os IDs dos autores inseridos
        const autoresIds = autoresInseridos.map(autor => autor._id);

        // Atualizar os dados dos livros para incluir os IDs dos autores
        const dadosLivrosComAutores = [
            {
                titulo: 'Aventuras na Terra Média', 
                editora: 'Editora Fantasia', 
                autor: autoresIds[0],
                observacao: 'Um clássico da literatura fantástica', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1954-07-29'),
                estaDisponivel: true
            },
            { 
                titulo: 'O Código da Vinci', 
                editora: 'Editora Mistério', 
                autor: autoresIds[1],
                observacao: 'Intrigante mistério envolvendo códigos e conspirações', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('2003-03-18'),
                estaDisponivel: true
            },
            { 
                titulo: 'Harry Potter e a Pedra Filosofal', 
                editora: 'Editora Magia', 
                autor: autoresIds[2],
                observacao: 'O primeiro livro da série Harry Potter', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1997-06-26'),
                estaDisponivel: true
            },
            { 
                titulo: 'O Senhor dos Anéis', 
                editora: 'Editora Épica', 
                autor: autoresIds[0],
                observacao: 'Uma jornada épica pela Terra Média', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1954-10-20'),
                estaDisponivel: true
            },
            { 
                titulo: 'A Revolução dos Bichos', 
                editora: 'Editora Política', 
                autor: autoresIds[3],
                observacao: 'Uma alegoria política sobre a Revolução Russa', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1945-08-17'),
                estaDisponivel: false 
            },
            { 
                titulo: '1984', 
                editora: 'Editora Distopia', 
                autor: autoresIds[3],
                observacao: 'Um romance distópico sobre controle totalitário', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1949-06-08'),
                estaDisponivel: false
            },
            { 
                titulo: 'Orgulho e Preconceito', 
                editora: 'Editora Romance', 
                autor: autoresIds[4],
                observacao: 'Um clássico da literatura inglesa sobre amor e sociedade', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1813-01-28') 
            },
            { 
                titulo: 'O Pequeno Príncipe', 
                editora: 'Editora Infantil', 
                autor: autoresIds[5],
                observacao: 'Um clássico da literatura infantil com profundas mensagens filosóficas', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1943-04-06'),
                estaDisponivel: true
            },
            { 
                titulo: 'Dom Quixote', 
                editora: 'Editora Aventura', 
                autor: autoresIds[6], 
                observacao: 'Um romance de cavalaria clássico', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1605-01-16'),
                estaDisponivel: true
            },
            { 
                titulo: 'A Metamorfose', 
                editora: 'Editora Surreal', 
                autor: autoresIds[7], 
                observacao: 'Um conto surreal sobre um homem que se transforma em inseto', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1915-10-15'),
                estaDisponivel: true
            }
        ]
        
        await livro.insertMany(dadosLivrosComAutores)
            .then(() => {
                // Desconectar-se do banco de dados após a inserção
                mongoose.disconnect();
            }).catch(err => console.error('Erro ao inserir dados:', err));
            console.log('Realizado insert dos dados dos livros com sucesso');
            console.log('Desconectado do MongoDB');

    })
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
