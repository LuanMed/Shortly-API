import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { createSession, createUser, getSessionsById, getUserByEmail, updateSession } from "../repositories/auth.repository.js";

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
        const user = await getUserByEmail(email);
        if (user.rowCount !== 0) return res.status(409).send('Email já cadastrado');

        await createUser({ name, email, encryptedPassword });

        res.sendStatus(201);

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (user.rowCount === 0 || !bcrypt.compareSync(password, user.rows[0].password)) {
            return res.status(401).send('Email ou senha incorretos');
        }

        const token = uuidv4();

        const logged = await getSessionsById(user.rows[0].id);
        if (logged.rowCount !== 0) {
            await updateSession(token, logged.rows[0].id);
        } else {
            await createSession(user.rows[0].id, token);
        }

        return res.status(200).send({token});

    } catch (error) {
        res.status(500).send(error.message);
    }
}