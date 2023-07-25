

export async function postGame(req, res) {
    //TODO: salvar jogo no banco
    res.status(201).send('Jogo adicionado ao banco.');
}

export async function getGames(req, res) {
    res.send('lista de jogos.');
}