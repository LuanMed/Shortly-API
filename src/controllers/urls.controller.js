import { nanoid } from "nanoid";

export async function getById (req, res) {
    const { id } = req.params;

    try {
        const link = await db.query(`SELECT links.id, links."shortUrl", links.url FROM links WHERE id=$1;`, [id]);

        if (link.rowCount === 0) return res.status(404).send("Esse id não existe");

        res.send(link.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function createShortUrl (req, res) {
    const { url } = req.body;
    const { user } = res.locals;
    const { user_id } = user;
    const shortUrl = (teste = nanoid(8));

    try {
        await db.query(`
        INSERT INTO links ("shortUrl", url, user_id, "visitCount") 
        VALUES ($1, $2, $3, 0);`, [shortUrl, url, user_id]);

        const body = await db.query(`SELECT links.id, links."shortUrl" FROM links WHERE "shortUrl"=$1;`, [shortUrl]);

        res.status(201).send(body.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// let teste = 'https://www.figma.com/file/DWg9233KR2GS6RLvfZRwyd/Shortly?node-id=0%3A1&t=dbkJ1NuZZdRQCeh9-0';
// const shortUrl = (teste = nanoid(8));
// console.log(shortUrl);

// {
//     "id": 1,
//     "shortUrl": "...",
//     "url": "...",
//     "user_id": "...",
//     "visitCount": soma da quantidade de visitas do link
// },