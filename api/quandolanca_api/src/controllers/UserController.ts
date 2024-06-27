import { Request, Response } from "express"
import { UserRepository } from "../repository/UserRepository"
import { comparePassword, generateHash } from "../utils/password"
import jwt from 'jsonwebtoken'

//SECRET
const SECRET = "jfn30tk5#4f$"

export class UserController {

    static async store(req: Request, res: Response){
        try {
            const { username, email, password } = req.body
            if(!username || !email || !password){
                return res.status(400).json({ message: 'Erro ao cadastrar usuário' })
            }

            //verifica se o usuário já existe
            const emailAlreadyExists = await UserRepository.findByEmail(email)
            if(emailAlreadyExists){
                return res.status(400).json({ message: 'email já cadastrado' })
            }

            const usernameAlreadyExists = await UserRepository.findByUsername(`${username}`)
            if(usernameAlreadyExists){
                return res.status(400).json({ message: 'username já cadastrado' })
            }

            //encripta a senha e cria o usuário
            const hashedPass = await generateHash(password)
            const user = {
                email, username, password: hashedPass
            }

            //insere o usuário no banco de dados
            const createdUser = await UserRepository.create(user)
            if(createdUser){
                res.status(201).json({ message: "Usuário cadastrado com sucesso" })
            } else {
                res.status(400).json({ message: 'erro ao criar conta' })
            }

            //armazena um dado
        } catch(error){
            console.error(error)
            throw error
        }
    }

    static async login(req: Request, res: Response){
        try {
            const { username, password } = req.body
            
            if(!password || !username){
                return res.status(400).json({ message: 'insira as informações corretamente' })
            }

            //o usuário existe?
            const user = await UserRepository.findUser(username)
            if(!user){
                return res.status(400).json({ message: 'Usuário não existe' })
            }

            //as senhas coincidem?
            const isPasswordRight = await comparePassword(password, user.password)
            if(isPasswordRight === false){
                return res.status(400).json({ message: 'insira as informações corretamente' })
            }

            //retorna o token
            const token = jwt.sign({id: user.id}, SECRET)

            res.status(200).json({ message: 'login realizado com sucesso', token })

        } catch(error){
            console.error(error)
            throw error
        }
    }
}