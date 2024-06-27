const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUserByToken = async (token) => {
    if(!token){
        res.status(422).json({message: 'acesso negado'});
    }

    const decoded = jwt.verify(token, 'nossosecret');
    const userId = decoded.id;
    const user = await User.findById(userId);


    return user;
}

module.exports = getUserByToken;