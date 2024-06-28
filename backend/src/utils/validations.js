export function processaBusca(parametros) {
    const {titulo, editora, nomeAutor} = parametros;

    let busca = {};

    if(titulo) busca.titulo = {$regex: titulo, $options: "i"};
    if(editora) busca.editora = {$regex: editora, $options: "i"};
    if(nomeAutor){
        const autor = autores.findOne({nome: nomeAutor});
        if (autor !== null) {
            busca.autor = autor._id;
        } else {
            busca = null;
        }
        
    }
    return busca;
};

export function validarFormatoEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false; // Verifica se o CPF tem 11 dígitos ou se todos os dígitos são iguais
    }

    let soma;
    let resto;
    soma = 0;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }
    return true;
}