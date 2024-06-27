import { Request, Response } from "express";
import { GameRepository } from "../repository/GameRepository";

export class GameController {
    static async index(req: Request, res: Response){
        // filtros - jogos que chegam em até 30 dias; jogos lançados em até 30 dias; jogos por categoria;
        try {
            const { page, minified } = req.body

            // const games = await GameRepository.findAll(minified=true,)
            const games = await GameRepository.findAll({ page, minified })
            res.status(200).json(games)
        }catch(error){
            res.status(400).json('Erro ao recuperar jogos')
        }
    }

    static async show(req: Request, res: Response){
        try {
            const { term } = req.params //nome ou id

            const game = await GameRepository.search(term)
            
            res.status(200).json(game)
        }catch(error){
            res.status(400).json({message: 'Não foi possível recuperar o jogo'})
        }
    }
}