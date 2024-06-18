import mongoose from "mongoose";

const emprestimoSchema = new mongoose.Schema(
    {
        id: {type: String},
        livro:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "livros",
            required: [true, "O id do livro é obrigatório"]
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usuarios",
            required: [true, "O id do usuario é obrigatório"]
        },
        dataEmprestimo: {
            type: Date,
            default: Date.now,
            required: true
          },
          dataDevolucao: {
            type: Date,
            required: [true, "A data de devolução é obrigatória"]
          },
          devolvido: {
            type: Boolean,
            default: false
          }        
    },
    {
        versionKey: false
    }
);

const emprestimo = mongoose.model("empresimos", emprestimoSchema);

export default emprestimo;