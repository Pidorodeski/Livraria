import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
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
        senha: { type: String, required: true }, // A senha é obrigatória
        cpf: { type: String },
        dataNascimento: { type: Date },
        perfil: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "perfis",
            required: [true, "O perfil de acesso é obrigatório"]
        }
    },
    {
        versionKey: false
    }
);

const usuario = mongoose.model("usuarios", usuarioSchema);

export default usuario;
