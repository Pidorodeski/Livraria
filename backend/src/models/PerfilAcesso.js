import mongoose from "mongoose";

const perfilAcessoSchema = new mongoose.Schema(
    {
        nomePerfil: {type: String},
        codigo: {type: Number},
        status: { type: String},
    },
    {
        versionKey: false
    }
);

const perfil = mongoose.model("perfil", perfilAcessoSchema);

export default perfil;
