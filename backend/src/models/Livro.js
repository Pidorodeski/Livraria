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
            type: String, 
            required: [true, "Autor obrigatório"]
        },
        observacao: {
            type: String,
            validate: {
                validator: (valor) => {
                    return valor.length <= 50  
                },
                message: "Quantidade de caracteres maior que o máximo: 50"    
            },
        },
        dataInclusao: {type: Date},
        dataPublicacao: {type: Date}
    }, 
{
    versionKey: false
}
);

const livro = mongoose.model("livros", livroSchema);

export default livro;