import { supabase } from '../database/supabase';
import { timer } from '../utils/timer';

type findAllTypes = {
    page?: number
    minified?: boolean
}

export class GameRepository {
    static async findAll({ page, minified }: findAllTypes){ //10 -> 50
        function addTimer(games: any[]){
            const gamesWithTimer: any[] = games.map(game => ({
                ...game, lançamento: game.release == 'To Be Announced' ? game.release : timer(game.release)
            }))

            return gamesWithTimer
        }

        if(page){
            const pageSize = 10; // Número de jogos por página
            const start = (page - 1) * pageSize; // Índice inicial
            const end = start + pageSize - 1; // Índice final
            const { data: games } = minified ? await supabase.from('games').select("name, release").range(start, end) : await supabase.from('games').select("*").range(start, end)
            if(games){
                return addTimer(games)
            } 
        }

        const { data: games } = minified ? await supabase.from('games').select("name, release") : await supabase.from('games').select("*")
        if(games){
            return addTimer(games)
        }
    }

    static async search(term: string){
        const gameById = await this.findById(term)
        const gameByName = await this.findByName(term)

        if(gameById !== null){
            return gameById
        }else if(gameByName !== null){
            return gameByName
        }else{
            throw new Error
        }
    }

    static async findById(id: string){
        const { data: game } = await supabase.from('games').select("*").eq('id', id)
        if(game == null){
            return null
        }
        
        return game
    }

    static async findByName(term: string){
        const { data: game, error } = await supabase
        .from('games')
        .select("*")
        .ilike('name', `%${term.replaceAll('-', ' ')}%`); // ilike para case-insensitive e % para busca parcial

        if (error) {
            console.error('Erro ao buscar jogo:', error);
            return null;
        }

        if (game.length === 0) {
            return null;
        }

        return game;
    }

    static async checkIfGameExists(gameId: string){
        const { data: game, error } = await supabase.from('games').select('*').eq('id', gameId)
    
        if(error){
            return false
        }

        if(game!.length === 0){
            return false
        } else {
            return true
        }
    }
}