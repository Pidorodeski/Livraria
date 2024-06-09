import express from "express";
import connectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await connectaNaDatabase();

conexao.on("error", (erro) =>{
    console.error("Erro de conexão com o banco de dados", erro)
});

conexao.once("open", () =>{
    console.log("Conexão com o banco realizada com sucesso");
})

const app = express();
routes(app);

export default app;
