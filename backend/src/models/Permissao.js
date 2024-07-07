import mongoose from "mongoose";

// Definindo o esquema de permissões
const permissaoSchema = new mongoose.Schema(
    {
        perfil: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "perfis", 
            required: true 
        },
        recursos: [
            {
                nomeRecurso: { 
                    type: String, 
                    required: true 
                },
                acoes: {
                    get: { type: Boolean, default: false },
                    post: { type: Boolean, default: false },
                    put: { type: Boolean, default: false },
                    delete: { type: Boolean, default: false }
                }
            }
        ]
    },
    {
        versionKey: false
    }
);

const permissao = mongoose.model("permissoes", permissaoSchema);

export default permissao;
