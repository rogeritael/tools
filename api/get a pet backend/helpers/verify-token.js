const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    if(!req.headers['x-access-token']){
        return res.status(401).json({ message: 'acesso negado' });
    };

    const token = req.headers['x-access-token'];

    if(!token){
        return res.status(401).json({ message: 'acesso negado' });
    };

    try {
        const verified = jwt.verify(token, 'nossosecret');
        req.user = verified;
        next();
    }catch(error) {
        return res.status(400).json({ message: 'Token inválido' });
    }
};

module.exports = checkToken;