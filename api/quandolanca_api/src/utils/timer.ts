export function timer(dataApi: string){
    const data: any = new Date(dataApi); // Converte a string para um objeto Date
    const agora: any = new Date();// Data atual

    // Calcular a diferença em dias
    const umDia = 24 * 60 * 60 * 1000; // Milissegundos em um dia
    const diferencaMilissegundos = data - agora;
    const diferencaDias = Math.floor(diferencaMilissegundos / umDia);

    let mensagem;
    if (data.toDateString() === agora.toDateString()) {
        mensagem = "A data é hoje.";
    } else if (diferencaDias > 0) {
        mensagem = `Lança em ${diferencaDias} dias.`;
    } else {
        mensagem = `Lançado há ${Math.abs(diferencaDias)} dias.`;
    }

    return mensagem;
}