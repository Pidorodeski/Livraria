import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid'; // Importando a função v4 do pacote uuid

const usuarioSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "Nome é obrigatório"]
        },
        email: {
            type: String,
            required: [true, "Email é obrigatório"],
            unique: true // Garantindo que o email seja único na base de dados
        },
        senha: { type: String, required: true }, // A senha é obrigatória
        cpf: { type: String },
        dataNascimento: { type: Date }
    },
    {
        versionKey: false
    }
);

const usuario = mongoose.model("usuarios", usuarioSchema);

export default usuario;
