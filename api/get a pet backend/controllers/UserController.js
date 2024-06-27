const User = require('../models/User');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const jwt = require('jsonwebtoken');
const getUserByToken = require('../helpers/get-user-by-token');

class UserController
{
    static async register(req, res){
        const { name, email, phone, password, confirmpassword } = req.body;

        //validations
        if(!name){
            res.status(422).json({ message: 'O nome é obrigatório' });
            return;
        }

        if(!email){
            res.status(422).json({ message: 'O email é obrigatório' });
            return;
        }

        if(!phone){
            res.status(422).json({ message: 'O telefone é obrigatório' });
            return;
        }

        if(!password){
            res.status(422).json({ message: 'A senha é obrigatória' });
            return;
        }

        if(!confirmpassword){
            res.status(422).json({ message: 'A confirmação de senha é obrigatória' });
            return;
        }

        if(password !== confirmpassword){
            res.status(422).json({ message: 'As senhas não coincidem' });
            return
        }

        //check if user exists
        const userExists = await User.findOne({email: email});
        if(userExists){
            res.status(422).json({message: 'Este email já foi cadastrado' });
        }

        //create a encrypted password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        //create user
        const user = new User({
            name: name, email: email, phone: phone,
            password: passwordHash
        });

        try{
            const newUser = await user.save();
            
            await createUserToken(newUser, req, res);
        }catch(error){
            res.status(500).json({ message: error })
        }

    }

    static async login(req, res) {
        const { email, password } = req.body;

        if(!email){
            res.status(422).json({ message: 'O email é obrigatório' });
            return;
        }

        if(!password){
            res.status(422).json({ message: 'A senha é obrigatória' });
            return;
        }

        const user = await User.findOne({  email: email });
        if(!user){
            res.status(422).json({ message: 'Nenhum usuário cadastrado com este endereço de email' });
            return;
        }

        const checkpassword = await bcrypt.compare(password, user.password);

        if(!checkpassword){
            res.status(422).json({ message: 'Senha inválida' });
            return;
        }

        await createUserToken(user, req, res);
    }

    static async checkUser(req, res){
        let currentUser; 

        if(req.headers){
            
            const token = getToken(req);
            const decoded = jwt.verify(token, 'nossosecret');

            currentUser = await User.findById(decoded.id);

            currentUser.password = undefined;

        }else {
            currentUser = null;
        }

        res.status(200).send(currentUser);
    }

    static async getUserById(req, res){
        const { id } = req.params;

        try {
            const user = await User.findById(id).select("-password");
            res.status(200).json({ user });
        } catch (error) {
            res.status(422).json({ message: 'usuário não encontrado' });
        }
    }

    static async editUser(req, res){
        const { id } = req.params;
        const token = req.headers['x-access-token'];
        const user = await getUserByToken(token);
        const { name, email, phone, password, confirmpassword } = req.body;

        if(req.file){
            user.image = req.file.filename;
        }

        //validations
        if(!name){
            res.status(422).json({ message: 'O nome é obrigatório' });
            return;
        }

        user.name = name;

        if(!email){
            res.status(422).json({ message: 'O email é obrigatório' });
            return;
        }

        const userExists = await User.findOne({email: email});
        if(user.email !== email && userExists){
            res.status(422).json({ message: 'Usuário não encontrado'});
            return;
        }

        user.email = email;

        if(!phone){
            res.status(422).json({ message: 'O telefone é obrigatório' });
            return;
        }

        user.phone = phone;

        if(password != confirmpassword){
            res.status(422).json({ message: 'As senhas não conferem' });
            return;
        }else if(password === confirmpassword && password !== null){
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            user.password = passwordHash;
        }

        try {
            
            const updateduser = await User.findByIdAndUpdate({ _id: user._id }, { $set: user }, { new: true });
            res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: error });
            return;
        }

        res.status(201).json('updated');

    }
}

module.exports = UserController;