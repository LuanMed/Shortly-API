import { db } from "../configs/database.js";
import { nanoid } from "nanoid";

export async function getById(req, res) {
    const { id } = req.params;

    try {
        const link = await db.query(`SELECT links.id, links."shortUrl", links.url FROM links WHERE id=$1;`, [id]);

        if (link.rowCount === 0) return res.status(404).send("Esse id não existe");

        res.send(link.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const link = await db.query(`SELECT * FROM links WHERE "shortUrl"=$1;`, [shortUrl]);

        if (link.rowCount === 0) return res.status(404).send("Esse id não existe");

        let visitCount = link.rows[0].visitCount++;

        await db.query(`
        UPDATE links SET "visitCount"=$1 WHERE id=$2;`, [visitCount, link.rows[0].id]);

        res.redirect(link.rows[0].url);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function createShortUrl(req, res) {
    const { url } = req.body;
    const { user } = res.locals;
    const userId = user.user_id;
    const shortUrl = (nanoid(8));

    try {
        await db.query(`
        INSERT INTO links ("shortUrl", url, user_id, "visitCount") 
        VALUES ($1, $2, $3, 0);`, [shortUrl, url, userId]);

        const body = await db.query(`SELECT links.id, links."shortUrl" FROM links WHERE "shortUrl"=$1;`, [shortUrl]);

        res.status(201).send(body.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deleteShortUrl(req, res) {
    const { id } = req.params;
    const { user } = res.locals;
    const userId = user.user_id;

    try {
        const link = await db.query(`SELECT * FROM links WHERE id=$1;`, [id]);

        if (link.rowCount === 0) return res.status(404).send("Esse id não existe");
        if (link.rows[0].user_id !== userId) return res.status(401).send("Você não tem autorização");

        await db.query(`DELETE FROM links WHERE id=$1;`, [id]);

    } catch (error) {
        res.status(500).send(error.message)
    }
}