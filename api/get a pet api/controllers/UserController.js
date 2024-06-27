const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createUserToken = require('../helpers/create_user_token');
const getUserByToken = require('../helpers/get_user_by_token');

module.exports = class UserController {

    static async register(req, res){
        const {name, email, phone, password, confirmpassword} = req.body;

        if(!name){
            res.status(422).json({message: 'O nome é obrigatório'});
            return;
        }
        if(!email){
            res.status(422).json({message: 'O email é obrigatório'});
            return;
        }
        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatório'});
            return;
        }
        if(!password){
            res.status(422).json({message: 'A senha é obrigatória'});
            return;
        }
        if(!confirmpassword){
            res.status(422).json({message: 'A confirmação de senha é obrigatória'});            
            return;
        }
        if(confirmpassword !== password){
            res.status(422).json({message: 'As senhas não coincidem'});
            return;
        }

        // check if user already exists
        const userExists = await User.findOne({email: email});

        if(userExists){
            res.status(422).json({message: 'Usuário já cadastrado com este endereço de email'});
            return;
        }

        //bcrypt
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        //create a user
        const user = new User({
            name, email, phone, password: passwordHash
        });

        try{
            const newUser = await user.save();
            
            await createUserToken(newUser, req, res);
        }catch(error){
            res.status(500).json({message: error});
        }
        
    }

    static async login(req, res){
        const {email, password} = req.body;

        if(!email){
            res.status(422).json({message: 'O email é obrigatório'});
            return;
        }
        if(!password){
            res.status(422).json({message: 'A senha é obrigatória'});
            return;
        }
        
        try{
            const user = await User.findOne({email});
            const checkPassword = await bcrypt.compare(password, user.password);

            if(!checkPassword){
                res.status(422).json({message: 'Senha incorreta'});
                return;
            }

            await createUserToken(user, req, res);
        }catch(error){
            res.status(422).json({message: 'Nenhum usuário encontrado com este endereço de email'});
            return;
        }
    }

    static async checkUser(req, res){
        let currentUser;
        console.log(req.headers.authorization)

        if(req.headers.authorization){
            const token = req.headers.authorization;
            const decoded = jwt.verify(token, 'nossosecret');

            currentUser = await User.findById(decoded.id);
            currentUser.password = undefined;
        }else{
            currentUser = null; 
        }

        res.status(200).send({'user': currentUser});
    }

    static async getUserById(req, res){
        const {id} = req.params;

        try{
            const user = await User.findById(id).select('-password');
            res.status(200).json(user);
        }catch(e){
            res.status(422).json({message: 'Nenhum usuário encontrado'});
        }
    }

    static async editUser(req, res){
        const user = await getUserByToken(req.headers.authorization);
        const {name, email, phone, password, confirmpassword} = req.body;
        try{

            if(!name){
                res.status(422).json({message: 'O nome é obrigatório'});
                return;
            }
            if(!email){
                res.status(422).json({message: 'O email é obrigatório'});
                return;
            }
            const userExists = await User.findOne({email: email});
            if(user.email !== email && userExists){
                res.status(422).json({message: 'Já existe um usuário cadastrado com este endereço de email'});
                return;
            }
            if(!phone){
                res.status(422).json({message: 'O telefone é obrigatório'});
                return;
            }

            user.name = name;
            user.email = email;
            user.phone = phone; 

            if(password !== confirmpassword){
                res.status(422).json({message: 'As senhas não coicidem'});
                return;
            }else if(password === confirmpassword && password !== null){
                const salt = await bcrypt.genSalt(12);
                const hashedPassword = await bcrypt.hash(password, salt);

                user.password = hashedPassword;
            }

            try{
                await User.findOneAndUpdate({id: user._id}, {$set: user}, {new: true});
                res.status(200).json({message: 'Usuário atualizado com sucesso'});
            }catch(error){
                res.status(422).json({message: error})
            }
            
        }catch(e){
            res.status(422).json({message: 'Usuário não encontrado'});
        }
    }
}