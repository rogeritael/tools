const doadores = (sequelize, DataTypes) => {
    const doador = sequelize.define('doador', {
        nome: {
            type: DataTypes.STRING(200)
        },
        cpf_cnpj: {
            type: DataTypes.STRING(14)
        },
        tipo_pessoa: {
            type: DataTypes.STRING(1)
        },
        senha: {
            type: DataTypes.STRING(64)
        },
        celular: {
            type: DataTypes.STRING(14)
        },
        email: {
            type: DataTypes.STRING(100),
            validate: {
                isEmail: true
            }
        },
        whatsapp: {
            type: DataTypes.BOOLEAN
        },
        endereco: {
            type: DataTypes.STRING(200)
        },
        foto: {
            type: DataTypes.STRING(100)
        },
        site_ou_rede_social: {
            type: DataTypes.STRING(100)
        }
    });

    return doador
}

module.exports = doadores