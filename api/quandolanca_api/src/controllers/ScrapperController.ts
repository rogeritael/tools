import { Request, Response } from "express";
import { ScrapperRepository } from "../repository/ScrapperRepository";

export class ScrapperController {
    
    static async insertGames(req: Request, res: Response){
        try {
            const { range } = req.body as { range: string }
    
            const { added, inserted, notInserted } = await ScrapperRepository.insertByRange(range)
    
            res.status(201).json({ inserted: inserted.length, notInserted: notInserted.length, addedToDB: added ? added : [] })
        } catch(error){
            res.status(400).json({message: 'erro ao inserir jogos' })
        }
    }

    static async findAnnouncedGames(req: Request, res: Response){
        try {
            const message = await ScrapperRepository.findAnnouncedGames()
            res.status(200).json(message)
        }catch(error){
            res.status(400).json({message: 'erro ao inserir salvar jogos anunciados' })
        }
    }
}