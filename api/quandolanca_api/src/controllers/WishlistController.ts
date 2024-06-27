import { Request, Response } from "express";
import { supabase } from '../database/supabase';
import { WishlistRepository } from "../repository/WishlistRepository";
import { UserRepository } from "../repository/UserRepository";
import { GameRepository } from "../repository/GameRepository";

export class WishlistController {
    
    static async index(req: Request, res: Response){
        try {
            const userId = req.user.id

            //verifica se o usuário existe
            const userExists = await UserRepository.checkIfUserExists(userId)
            if(!userExists){
                return res.status(400).json({ message: "Esse usuário não existe" })
            }

            const wishlist = await WishlistRepository.findAll(userId)
            res.status(200).json(wishlist)
        } catch(error){
            console.error(error)
            throw error
        } 
    }

    static async store(req: Request, res: Response){
        try {
            const { gameId } = req.body
            const userId = req.user.id
            // const userId = '9bdeb52a-54bb-487e-a96a-ac55c9eabdd4'

            if(!userId || !gameId){
                return res.status(400).json({ message: 'Erro ao adicionar jogo aos favoritos' })
            }

            //verifica se o usuário existe
            const userExists = await UserRepository.checkIfUserExists(userId)
            if(!userExists){
                return res.status(400).json({ message: "Esse usuário não existe" })
            }

            // //verifica se o jogo existe
            const gameExists = await GameRepository.checkIfGameExists(gameId)
            if(!gameExists){
                return res.status(400).json({ message: "Esse jogo não existe" })
            }

            //verifica se o jogo já foi adicionado a wishlist, se foi, nao tem porque adicionar
            const isInWishlist = await WishlistRepository.checkIfGameIsInWishlist(userId, gameId)
            if(isInWishlist){
                return res.status(400).json({ message: 'O jogo já está salvo na sua wishlist' })
            }

            await WishlistRepository.addToWishlist(userId, gameId)
            res.status(201).json({ message: `jogo adicionado à lista de desejos com sucesso` })
        } catch(error){
            console.error(error)
            throw error
        }
    }

    static async delete(req: Request, res: Response){
        try{
            const { gameId } = req.body
            const userId = req.user.id

            //verifica se o usuário existe
            const userExists = await UserRepository.checkIfUserExists(userId)
            if(!userExists){
                return res.status(400).json({ message: "Esse usuário não existe" })
            }

            // //verifica se o jogo existe
            const gameExists = await GameRepository.checkIfGameExists(gameId)
            if(!gameExists){
                return res.status(400).json({ message: "Esse jogo não existe" })
            }

            //verifica se o jogo já foi adicionado a wishlist. Se nao foi adicionado, nao tem porque excluir
            const isInWishlist = await WishlistRepository.checkIfGameIsInWishlist(userId, gameId)
            if(!isInWishlist){
                return res.status(400).json({ message: 'O jogo não está na sua wishlist' })
            }

            await WishlistRepository.removeFromWishlist(userId, gameId)
            res.status(200).json({ message: 'Jogo removido da wishlist' })

        }catch(error){
            res.status(400).json({ message: 'Erro ao remover jogo da wishlist' })
        }

    }
}