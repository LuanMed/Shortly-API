import { db } from "../configs/database.js";

export async function getUserByEmail (email) {
    const user = await db.query(`SELECT * FROM users WHERE email=$1;`, [email]);
    return user;
}

export async function createUser ({ name, email, encryptedPassword }) {
    return await db.query(`
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3);`, 
    [name, email, encryptedPassword])
}

export async function getSessionsById (id) {
    const logged = await db.query(`SELECT * FROM sessions WHERE user_id=$1;`, [id]);
    return logged;
}

export async function createSession (id, token){
    return await db.query(`INSERT INTO sessions (user_id, token) VALUES ($1, $2);`, [id, token]);
}

export async function updateSession (token, id){
    return await db.query(`UPDATE sessions SET token=$1, "createdAt"=now() WHERE id=$2;`, [token, id]);
}