import { db } from "../configs/database.js";
import { nanoid } from "nanoid";
import { createShort, deleteLink, getLinkById, getLinkByShortUrl, updateLink } from "../repositories/urls.repository.js";

export async function getById(req, res) {
    const { id } = req.params;

    try {
        const link = await getLinkById(id);

        if (link.rowCount === 0) return res.status(404).send("Esse id não existe");

        res.send(link.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const link = await getLinkByShortUrl(shortUrl);

        if (link.rowCount === 0) return res.status(404).send("Esse id não existe");

        let visitCount = Number(link.rows[0].visitCount) + 1;

        await updateLink(visitCount, link.rows[0].id);

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
        await createShort(shortUrl, url, userId);

        const body = await getLinkByShortUrl(shortUrl);

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
        const link = await getLinkById(id);

        if (link.rowCount === 0) return res.status(404).send("Esse id não existe");
        if (link.rows[0].user_id !== userId) return res.status(401).send("Você não tem autorização");

        await deleteLink(id);

        res.sendStatus(204);

    } catch (error) {
        res.status(500).send(error.message)
    }
}