import mongoose from "mongoose"
import "dotenv/config";

import livro from "./src/models/Livro.js";


// Conectar-se ao banco de dados MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(async () => {
        console.log('Conectado ao MongoDB');
        // Array de dados a serem inseridos
        const dados = [
            { 
                titulo: 'Aventuras na Terra Média', 
                editora: 'Editora Fantasia', 
                autor: 'J. R. R. Tolkien', 
                observacao: 'Um clássico da literatura fantástica', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1954-07-29') 
            },
            { 
                titulo: 'O Código da Vinci', 
                editora: 'Editora Mistério', 
                autor: 'Dan Brown', 
                observacao: 'Intrigante mistério envolvendo códigos e conspirações', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('2003-03-18') 
            },
            { 
                titulo: 'Harry Potter e a Pedra Filosofal', 
                editora: 'Editora Magia', 
                autor: 'J. K. Rowling', 
                observacao: 'O primeiro livro da série Harry Potter', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1997-06-26') 
            },
            { 
                titulo: 'O Senhor dos Anéis', 
                editora: 'Editora Épica', 
                autor: 'J. R. R. Tolkien', 
                observacao: 'Uma jornada épica pela Terra Média', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1954-10-20') 
            },
            { 
                titulo: 'A Revolução dos Bichos', 
                editora: 'Editora Política', 
                autor: 'George Orwell', 
                observacao: 'Uma alegoria política sobre a Revolução Russa', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1945-08-17') 
            },
            { 
                titulo: 'Orgulho e Preconceito', 
                editora: 'Editora Romance', 
                autor: 'Jane Austen', 
                observacao: 'Um clássico da literatura inglesa sobre amor e sociedade', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1813-01-28') 
            },
            { 
                titulo: '1984', 
                editora: 'Editora Distopia', 
                autor: 'George Orwell', 
                observacao: 'Um romance distópico sobre controle totalitário', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1949-06-08') 
            },
            { 
                titulo: 'O Pequeno Príncipe', 
                editora: 'Editora Infantil', 
                autor: 'Antoine de Saint-Exupéry', 
                observacao: 'Um clássico da literatura infantil com profundas mensagens filosóficas', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1943-04-06') 
            },
            { 
                titulo: 'Dom Quixote', 
                editora: 'Editora Aventura', 
                autor: 'Miguel de Cervantes', 
                observacao: 'Um romance de cavalaria clássico', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1605-01-16') 
            },
            { 
                titulo: 'A Metamorfose', 
                editora: 'Editora Surreal', 
                autor: 'Franz Kafka', 
                observacao: 'Um conto surreal sobre um homem que se transforma em inseto', 
                dataInclusao: new Date(), 
                dataPublicacao: new Date('1915-10-15') 
            },
        ];


        // Inserir os dados no banco de dados
        await livro.insertMany(dados)
            .then(() => {
                console.log('Dados inseridos com sucesso');
                // Desconectar-se do banco de dados após a inserção
                mongoose.disconnect();
            })
            .catch(err => console.error('Erro ao inserir dados:', err));
    })
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
