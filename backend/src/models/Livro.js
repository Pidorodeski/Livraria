import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    {
        id: {type: String},
        titulo: {
            type: String, 
            required: [true, "Titulo é obrigatório"]
        },
        editora: {
            type: String, 
            required: [true, "Editora obrigatória"]
        },
        autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "autores",
            required: [true, "O(a) autor(a) é obrigatório"]
          },
        observacao: {
            type: String,
            validate: {
                validator: (valor) => {
                    return valor.length <= 500  
                },
                message: "Quantidade de caracteres maior que o máximo: 50"    
            },
        },
        dataInclusao: {type: Date},
        dataPublicacao: {type: Date},
        estaDisponivel: {
            type: Boolean,
            default: true
        }
    }, 
    {
        versionKey: false
    }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;