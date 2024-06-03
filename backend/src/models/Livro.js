import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    titulo: {type: mongoose.Schema.Types.String, require: true},
    editora: {type: mongoose.Schema.Types.String, require: true},
    autor: {type: mongoose.Schema.Types.String, require: true},
    observacao: {type: mongoose.Schema.Types.String, require: true},
    dataInclusao: {type: mongoose.Schema.Types.Date, require: true},
    dataPublicacao: {type: mongoose.Schema.Types.Date, require: true},
}, {versionKey: false});

const livro = mongoose.model("livros", livroSchema);

export default livro;