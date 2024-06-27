import axios, { AxiosRequestConfig } from "axios";
const UserAgent = require('user-agents')

export async function getPageInfo(target: string){
    // configuração 
    const userAgent = await new UserAgent();
    const headers: AxiosRequestConfig['headers'] = {
        'User-Agent': userAgent.toString()
    };

    // acessando a url e recuperando o html da página
    const urlalvo = target
    const { data } = await axios.get(urlalvo, { headers })

    return data 
}