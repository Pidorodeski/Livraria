import express from "express";
import connectaNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";
import autenticado from "./middlewares/autenticado.js";

const conexao = await connectaNaDatabase();

conexao.on("error", (erro) =>{
    console.error("Erro de conexão com o banco de dados", erro)
});

conexao.once("open", () =>{
    console.log("Conexão com o banco realizada com sucesso");
})

const app = express();
routes(app);

app.use(autenticado);
app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;
