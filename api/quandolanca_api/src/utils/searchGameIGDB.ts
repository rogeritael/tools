import { getPageInfo } from "./getPageInfo"
import cheerio = require('cheerio');

export async function searchGameIGDB(term: string){
    const updatedTerm = term.replaceAll(' ', '%20')
    const defaultQuery = 'https://www.igdb.com/search?utf8=%E2%9C%93&q='
    const finalQuery = defaultQuery + updatedTerm
    console.log(finalQuery)

    
    //entrar no site e pegar o primeiro resultado (apenas de jogos com a data diferente de 'To Be Announced')
    // const data = await getPageInfo(term)
    // console.log(data)
    // const $ = cheerio.load(data)

    // const firstResult = await $('.game-list-container .media').map(async (index, element) => {
    //     console.log($(element).find('.overflow-wrap ').text())
    // })
    // console.log(firstResult)
        //se não retornar nada, é porque não existe

    //comparar o termo pesquisado com o nome do valor retornado para verificar se é o mesmo

    //recuperar imagem
    //recuperar os videos
}
// searchGameIGDB('resident evil 4 remake')
