import { db } from "../configs/database.js"

export async function getUsersMe(req, res) {
    const userId = res.locals.user.user_id;

    try {
        const body = await db.query(`
        SELECT users.id, users.name, SUM(links."visitCount") AS "visitCount",
        json_agg(json_build_object(
	        'id', links.id,
	        'shorUrl', links."shortUrl",
	        'url', links.url,
	        'visitCount', links."visitCount"
        )ORDER BY links.id) AS "shortenedUrls"
        FROM users JOIN links ON links.user_id = users.id
        WHERE users.id = $1
        GROUP BY users.id, users.name;
        `, [userId]);

        res.send(body.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}