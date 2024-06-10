import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipuladorDeErros(error, req, res, next) {
        if (error instanceof mongoose.Error.CastError) {
            new RequisicaoIncorreta().enviarResposta(res);
        } else if (error instanceof mongoose.Error.ValidationError) {
            new ErroValidacao(error).enviarResposta(res);

        } else if (error instanceof NaoEncontrado) {
            error.enviarResposta(res);
        }else {
            new ErroBase().enviarResposta(res)
        }
    };
export default manipuladorDeErros;