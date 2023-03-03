import { db } from "../configs/database.js";

export async function getLinkById(id) {
    const link = await db.query(`SELECT * FROM links WHERE id=$1;`, [id]);
    return link;
}

export async function getLinkByShortUrl(shortUrl) {
    const link = await db.query(`SELECT * FROM links WHERE "shortUrl"=$1;`, [shortUrl]);
    return link;
}

export async function createShort (shortUrl, url, userId) {
    return await db.query(`
    INSERT INTO links ("shortUrl", url, user_id, "visitCount") 
    VALUES ($1, $2, $3, 0);`, [shortUrl, url, userId]);
}

export async function updateLink (visitCount, id) {
    return await db.query(`
        UPDATE links SET "visitCount"=$1 WHERE id=$2;
        `, [visitCount, id]);
}

export async function deleteLink (id) {
    return await db.query(`DELETE FROM links WHERE id=$1;`, [id]);
}