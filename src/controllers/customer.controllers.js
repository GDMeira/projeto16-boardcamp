import db from "../database/database.connection.js";

export async function postCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        const searchCPF = await db.query(`SELECT * FROM customers WHERE cpf = $1;`, [cpf]);
        if (searchCPF.rowCount) return res.sendStatus(409);
    } catch (error) {
        res.status(500).send(error.message);
    }

    try {
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES (
            $1, $2, $3, $4);`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getCustomers(req, res) {
    try {
        const search = await db.query(`
        SELECT c.id, c.name, c.phone, c.cpf, TO_CHAR(c.birthday, 'YYYY-MM-DD') AS birthday
            FROM customers AS c`
        );
        res.send(search.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function getCustomersById(req, res) {
    try {
        const search = await db.query(`
            SELECT c.id, c.name, c.phone, c.cpf, TO_CHAR(c.birthday, 'YYYY-MM-DD') AS birthday
                FROM customers AS c
                WHERE id = $1;`, [req.params.id]
        );
        res.send(search.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}