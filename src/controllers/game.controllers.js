import { db } from "../database/database.connection.js";


export async function postGame(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body;

    try {
        const search = await db.query(`SELECT * FROM games WHERE name = $1`, [name]);
        if (search.rowCount) return res.sendStatus(409);
    } catch (error) {
        res.status(500).send(error.message);
    }

    try {
        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay")
            VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay]);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getGames(req, res) {
    res.send('lista de jogos.');
}