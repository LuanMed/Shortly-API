import { getRanking } from "../repositories/ranking.repository.js";

export async function visitRanking (req, res) {
    try {
        const body = await getRanking();

        res.send(body.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}