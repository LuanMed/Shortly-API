import { db } from "../configs/database.js";

export async function getUsers(id) {
    const body = await db.query(`
    SELECT users.id, users.name, SUM(links."visitCount") AS "visitCount",
    json_agg(json_build_object(
        'id', links.id,
        'shortUrl', links."shortUrl",
        'url', links.url,
        'visitCount', links."visitCount"
    )ORDER BY links.id) AS "shortenedUrls"
    FROM users JOIN links ON links.user_id = users.id
    WHERE users.id = $1
    GROUP BY users.id, users.name;
    `, [id]);
    return body;
}