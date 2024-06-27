import cheerio = require('cheerio');
import { getPageInfo } from '../utils/getPageInfo';
import { supabase } from '../database/supabase';
import { GameList } from '../@types/@gameList';

export class ScrapperRepository {
    static async findAnnouncedGames(){ // adiciona jogos ao games_to_add
    // BUSCA A URL DE TODOS OS JOGOS EM LANÇAMENTO
        // recupera o HTML da página
        const data = await getPageInfo('https://www.ign.com/upcoming/games')
    
        // buscando informações na página
        const $ = cheerio.load(data)
        
        $('.figure-tile').map(async (index, element) => {
            let game_url = $(element).find('.tile-link').attr('href')
            let game_name = $(element).find('.details figcaption').text()
            
            //salva no banco as listas de jogos
            await supabase.from('games_to_add').insert({ name: game_name, url: 'https://www.ign.com'+game_url, status: 'not added' });
        })

        return { message: 'Sucesso ao recuperar jogos em lançamento' }
    }

    static async insertByRange(range: string){
        let initial = range.split(':')[0]
        let last = range.split(':')[1]

        //busca a quantidade de ocorrencias igual ao range que não foram adicionados aos jogos
        const { data: urls } : any = await supabase.from('games_to_add').select("name, url, status, id").eq('status', 'not added');
        let added: any = []


        for(let index = Number(initial); index < Number(last); index++){
            added = [...added, urls[index]]
        }

        // BUSCA A INFORMAÇÃO DE CADA JOGO NA LISTA DE JOGOS QUE NÃO ESTÃO CADASTRADOS
        for (let index = Number(initial); index < Number(last); index++) {
            const currentGame = urls[index]

            const data = await getPageInfo(currentGame.url)

            // buscando informações na página
            const $ = cheerio.load(data)
            
            const name = $('.display-title').text()
            const release = $('.subtitle time').text()
            const developer = $('.subtitle a.underlined').text()
            const image = $('.object-thumbnail figure img').attr('src')
            const background = $('.object-thumbnail figure img').attr('src')

            // salvando lista de plataformas ⚠️⚠️⚠️
            let updatedPlatforms: string[] = []
            $('.platforms a.platform-icon').each((index, element) => {
                updatedPlatforms.push($(element).text());
            });
            
            updatedPlatforms = [...new Set(updatedPlatforms)] //desduplicando dados ⚠️⚠️⚠️

            //formatar a data para um formato aceitável
            const regexToCheckTBAString = /TBA/; //algumas datas vem com a string TBA, precisamos remover
            const formattedRelease = regexToCheckTBAString.test(release) ? 'To Be Announced' : new Date(release);
            
            let newGame = {
                name: name, developer: developer, image: image, release: formattedRelease, platforms: updatedPlatforms, background: background
            }

            //salva o jogo no banco de dados
            await supabase.from('games_to_add').update({ status: 'added' }).eq('id', currentGame.id);
            await supabase.from('games').insert([newGame]);
        }

        const { data: notInserted } : any = await supabase.from('games_to_add').select("name, url, status, id").eq('status', 'not added');
        const { data: inserted } : any = await supabase.from('games_to_add').select("name, url, status, id").eq('status', 'added');
        // console.log(`inseridos: ${inserted.length} - não inseridos: ${notInserted.length}`)
        return { added, inserted, notInserted }
    }

    static async findByUrl(target: string){
        
    }
}