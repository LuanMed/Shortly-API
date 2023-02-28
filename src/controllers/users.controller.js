import { db } from "../configs/database.js"

export async function getUsersMe(req, res) {
    const userId = res.locals.user.user_id;

    try {
        // const user = await db.query(`SELECT * FROM users WHERE id=$1;`, [userId]);
        // const visitCount = await db.query(`SELECT links."visitCount" FROM links WHERE ;`);

        const body = await db.query(`
        SELECT users.id, users.name,
        SUM(links."visitCount") AS visitCount,
        json_agg(links) AS "shotenedUrls"
        FROM users INNER JOIN links ON links.user_id = users.id
        WHERE users.id = $1
        GROUP BY users.id, users.name;
        `, [userId]);

        res.send(body.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}