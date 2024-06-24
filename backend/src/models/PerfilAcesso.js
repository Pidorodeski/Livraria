import mongoose from "mongoose";

const perfilAcessoSchema = new mongoose.Schema(
    {
        nomePerfil: {type: String},
        status: { type: String},
    },
    {
        versionKey: false
    }
);

const perfil = mongoose.model("perfis", perfilAcessoSchema);

export default perfil;
