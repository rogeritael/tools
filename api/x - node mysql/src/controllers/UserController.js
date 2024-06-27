class UserController {
    static async index(req, res){
        res.status(200).json({ message: 'rota users' })
    }

    static async store(req, res){

    }

    static async delete(req, res){

    }

    static async update(req, res){

    }
}

module.exports = UserController