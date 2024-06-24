import mongoose from "mongoose";

const leitorSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "Nome é obrigatório"]
        },
        email: {
            type: String,
            required: [true, "Email é obrigatório"],
            unique: true
        },
        cpf: { type: String },
        dataNascimento: { type: Date },
    },
    {
        versionKey: false
    }
);

const leitor = mongoose.model("leitor", leitorSchema);

export default leitor;
