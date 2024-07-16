import RequisicaoIncorreta from '../erros/RequisicaoIncorreta.js'
async function paginar(req, res, next) {
    try {
        let { limite = '10', pagina = '1', ordenacao = '_id:-1' } = req.query;

        let [campoOrdenacao, ordem] = ordenacao.split(':');

        const limiteNum = parseInt(limite);
        const paginaNum = parseInt(pagina);

        const resultado = req.resultado;

        if (limiteNum > 0 && paginaNum > 0) {
            const listaLivros = await resultado.find()
                .sort({ [campoOrdenacao]: parseInt(ordem) })
                .skip((paginaNum - 1) * limiteNum)
                .limit(limiteNum)
                .exec();

            res.status(200).json(listaLivros);
        } else {
            throw new RequisicaoIncorreta('Parâmetros de paginação inválidos');
        }
    } catch (error) {
        next(error);
    }
}

export default paginar;
