import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {
            type: String, 
            required: [true, "Nome é obrigatório"]
        },
        cpf: {type: String},
        dataNascimento:{type: Date},
    },
    {
        versionKey: false
    }
);

const usuario = mongoose.model("usuarios", usuarioSchema);

export default usuario;