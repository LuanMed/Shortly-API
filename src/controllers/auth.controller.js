import { db } from "../configs/database.js"
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
        const user = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
        if (user.rowCount !== 0) return res.status(409).send('Email já cadastrado');

        await db.query(`
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3);`, 
        [name, email, encryptedPassword]);

        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
        if (user.rowCount === 0 || !bcrypt.compareSync(password, user.rows[0].password)) {
            return res.status(401).send('Email ou senha incorretos');
        }

        const token = uuidv4();

        const logged = await db.query(`SELECT * FROM sessions WHERE user_id=$1;`, [user.rows[0].id]);
        if (logged.rowCount !== 0) {
            await db.query(`UPDATE sessions SET token=$1 WHERE id=$2;`, [token, logged.rows[0].id]);
        } else {
            await db.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2);`, [user.rows[0].id, token])
        }

        return res.status(200).send({token});

    } catch (error) {
        res.status(500).send(error.message);
    }
}