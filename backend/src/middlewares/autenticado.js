import pkg from 'jsonwebtoken';
const { verify, decode } = pkg;

const autenticado = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Access token não informado');
    }
    const [, accessToken] = token.split(" ");
    try {
        verify(accessToken, process.env.SECRET);
        const { id, email } = decode(accessToken);
        req.usuarioId = id;
        req.usuarioEmail = email;
        return next();
    } catch (error) {
        return res.status(401).send('Usuário não autorizado');
    }
}

export default autenticado;