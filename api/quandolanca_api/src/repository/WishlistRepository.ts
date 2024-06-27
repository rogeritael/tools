import { supabase } from '../database/supabase';

export class WishlistRepository {
    static async findAll(userId: string){
        //recupera o ID dos jogos da wishlist do usuário
        const {data: gamesId}  = await supabase.from('wishlist').select('game_id').eq('user_id', userId)
        
        //retorna as informações dos jogos baseado nos ID's recuperados
        if(gamesId){

            const { data: games, error } = await supabase
            .from('games')
            .select('*')
            .in('id', gamesId!.map(item => item.game_id));
            
            return games
        } else {
            throw new Error
        }
    }

    static async addToWishlist(user_id: string, game_id: string) {
        try {
          // Verificar se o game_id existe na tabela games
          const { data: game, error: gameError } = await supabase
            .from('games')
            .select('id')
            .eq('id', game_id)
            .single();
      
          if (gameError) {
            console.error('Erro ao verificar o jogo:', gameError);
            return { success: false, message: 'Erro ao verificar o jogo' };
          }
      
          if (!game) {
            return { success: false, message: 'Jogo não encontrado' };
          }
      
          // Verificar se o user_id existe na tabela users
          const { data: user, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('id', user_id)
            .single();
      
          if (userError) {
            console.error('Erro ao verificar o usuário:', userError);
            return { success: false, message: 'Erro ao verificar o usuário' };
          }
      
          if (!user) {
            return { success: false, message: 'Usuário não encontrado' };
          }
      
          // Inserir na tabela wishlist
          const { data: wishlist, error: wishlistError } = await supabase
            .from('wishlist')
            .insert([{ game_id: game_id, user_id: user_id }])
            .select();
      
          if (wishlistError) {
            console.error('Erro ao inserir na wishlist:', wishlistError);
            return { success: false, message: 'Erro ao inserir na wishlist' };
          }
      
          return { success: true, data: wishlist };
        } catch (error) {
          console.error('Erro inesperado:', error);
          return { success: false, message: 'Erro inesperado' };
        }
      }

    static async removeFromWishlist(user_id: string, game_id: string){
        const { data: wishlist, error: wishlistError } = await supabase
            .from('wishlist')
            .delete()
            .eq('user_id', user_id)
            .eq('game_id', game_id);
    }

    static async checkIfGameIsInWishlist(userId: string, gameId: string){
      const { data: wishlist, error } = await supabase.from('wishlist').select('*').eq('user_id', userId).eq('game_id', gameId)

      if(error){
        return false
      }

      if(wishlist!.length === 0){
        return false
      } else {
        return true
      }
    }
}