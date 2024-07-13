import mongoose from "mongoose";

const emprestimoSchema = new mongoose.Schema(
    {
        id: {type: String},
        livro:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "livros",
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usuarios",
        },
        dataEmprestimo: {
            type: Date,
            default: Date.now,
            required: true
          },
          dataDevolucao: {
            type: Date
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