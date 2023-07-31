import dayjs from "dayjs";
import db from "../database/database.connection.js";

export async function postRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        const search = await db.query(`
            SELECT c.name AS customer_name, g.*
                FROM customers AS c
                JOIN games as g
                ON c.id = $1 AND g.id = $2;`, [customerId, gameId]);
        if (!search.rowCount || search.rows[0].stockTotal <= 0) return res.sendStatus(400);
        
        const today = dayjs().format('YYYY-MM-DD');
        const price = daysRented * search.rows[0].pricePerDay;
        await db.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
                VALUES ($1, $2, $3, $4, null, $5, null);`, [customerId, gameId, today, daysRented, price]);
        //TODO: será que precisa diminuir o stockTotal do jogo no db?
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getRentals(req, res) {
    try {
        const search = await db.query(`
            SELECT 
                r.*,
                JSON_BUILD_OBJECT('id', c.id, 'name', c.name) AS customer,
                JSON_BUILD_OBJECT('id', g.id, 'name', g.name) AS game
            FROM
                rentals AS r
            JOIN
                customers AS c ON r."customerId" = c.id
            JOIN
                games AS g ON r."gameId" = g.id;`);

        res.send(search.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function returnRental(req, res) {
    const { id } = req.params;

    try {
        const search = await db.query(`
            SELECT *
                FROM rentals
                WHERE id = $1;`, [id]);
        
        if (search.rowCount === 0) return res.sendStatus(404);
        if (search.rows[0].returnDate) return res.sendStatus(400); 

        const rentDate = dayjs(search.rows[0].rentDate);
        const daysRented = search.rows[0].daysRented;
        const returnDate = rentDate.add(daysRented, 'day')
        const today = dayjs();
        let delay = today.diff(returnDate, 'day');
        delay = (delay >= 0 ? delay : 0);
        const delayFee = delay * search.rows[0].originalPrice / daysRented;

        await db.query(`
            UPDATE rentals 
            SET 
                "returnDate" = $1,
                "delayFee" = $2
            WHERE id = $3;`, [today, delayFee, id]);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params;

    try {
        const search = await db.query(`
            SELECT * 
            FROM rentals
            WHERE id = $1;`, [id]);
        
        if (!search.rowCount) return res.sendStatus(404);
        if (!search.rows[0].returnDate) return res.sendStatus(400);

        await db.query(`
            DELETE FROM rentals WHERE id = $1;`, [id]);

        res.sendStatus(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
}