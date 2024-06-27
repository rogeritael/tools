const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).json({message: 'acesso negado'});
        return;
    }

    const token = req.headers.authorization;

    if(!token){
        res.status(401).json({message: 'acesso negado'});
        return;
    }

    try {
        const verified = jwt.verify(token, 'nossosecret');
        req.user = verified;
        next();
        //todas as páginas que tiverem esse middleware terão acesso ao req.user
    } catch (error) {
        res.status(401).json({message: 'Token inválido'});
    }
}

module.exports = checkToken