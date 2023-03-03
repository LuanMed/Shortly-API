import { db } from "../configs/database.js";

export async function getRanking() {
    const body = await db.query(`
        SELECT users.id, users.name, COUNT(links.id) AS "linksCount", SUM(links."visitCount") AS "visitCount"
        FROM users LEFT JOIN links ON links.user_id = users.id
        GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;`
    );
    return body;
}