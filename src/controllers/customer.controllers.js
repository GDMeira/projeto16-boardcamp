import { db } from "../database/database.connection.js";

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
        const search = await db.query(`SELECT * FROM customers;`);
        res.send(search.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}