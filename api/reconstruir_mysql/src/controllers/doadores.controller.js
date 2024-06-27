const { doador } = require('../models')

class DoadoresController {
    async store(req, res){
        const novoDoador = {
            nome: 'roger rosa',
            cpf_cnpj: '03709845023',
            tipo_pessoa: 'j',
            senha: '12345',
            celular: '51981999999',
            email: 'rogerr@gmail.com',
            whatsapp: true,
            endereco: 'R. duque de caxias, 111',
            foto: 'http://images/ijgr64r34t.jpg',
            site_ou_rede_social: 'rogerr12'
        }
    
        // await doador.create(novoDoador)
        // res.status(200).json({ message: 'doador cadastrado com sucesso' })
        
        const doadores = await doador.findAll()
        res.status(200).json(doadores)
    }
}

module.exports = new DoadoresController