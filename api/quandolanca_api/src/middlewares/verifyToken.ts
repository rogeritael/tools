import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// const jwt = require('jsonwebtoken')

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    //verifica se foi passado algum token
    if(!req.headers.authorization){
        return res.status(422).json({ message: "Acesso negado" });
    }

    //verifica se o token é válido
    try{
        const verifiedToken = jwt.verify(req.headers.authorization, "jfn30tk5#4f$") as any;
        req.user = {
            id: verifiedToken.id
        };
        next();
    }catch(err){
        res.status(422).json({ message: "Token inválido" });
    }

    //retorna o usuário
}