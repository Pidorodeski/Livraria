import mongoose from "mongoose";

const perfilAcessoSchema = new mongoose.Schema(
    {
        nomePerfil: {type: String},
        status: { 
            type: Number,
            enum: {
                values: [0, 1, 2],
                message: '{VALUE} não é um valor válido para o campo status. Valores permitidos são: 0, 1 e 2.'
              },
            required: [true, "Status é obrigatório"]
        },
    },
    {
        versionKey: false
    }
);

const perfil = mongoose.model("perfis", perfilAcessoSchema);

export default perfil;
