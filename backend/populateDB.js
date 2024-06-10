import mongoose from "mongoose"
import "dotenv/config";
import autores from './src/models/Autor.js'
import livro from "./src/models/Livro.js";


// Conectar-se ao banco de dados MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(async () => {
        console.log('Conectado ao MongoDB');
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
                dataPublicacao: new Date('1954-07-29') 
            },
            { 
                titulo: 'O Código da Vinci', 
                editora: 'Editora Mistério', 
                autor: autoresIds[1],
                observacao: 'Intrigante mistério envolvendo códigos e conspirações', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('2003-03-18') 
            },
            { 
                titulo: 'Harry Potter e a Pedra Filosofal', 
                editora: 'Editora Magia', 
                autor: autoresIds[2],
                observacao: 'O primeiro livro da série Harry Potter', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1997-06-26') 
            },
            { 
                titulo: 'O Senhor dos Anéis', 
                editora: 'Editora Épica', 
                autor: autoresIds[0],
                observacao: 'Uma jornada épica pela Terra Média', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1954-10-20') 
            },
            { 
                titulo: 'A Revolução dos Bichos', 
                editora: 'Editora Política', 
                autor: autoresIds[3],
                observacao: 'Uma alegoria política sobre a Revolução Russa', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1945-08-17') 
            },
            { 
                titulo: '1984', 
                editora: 'Editora Distopia', 
                autor: autoresIds[3],
                observacao: 'Um romance distópico sobre controle totalitário', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1949-06-08') 
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
                dataPublicacao: new Date('1943-04-06') 
            },
            { 
                titulo: 'Dom Quixote', 
                editora: 'Editora Aventura', 
                autor: autoresIds[6], 
                observacao: 'Um romance de cavalaria clássico', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1605-01-16') 
            },
            { 
                titulo: 'A Metamorfose', 
                editora: 'Editora Surreal', 
                autor: autoresIds[7], 
                observacao: 'Um conto surreal sobre um homem que se transforma em inseto', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1915-10-15') 
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
