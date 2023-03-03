import { getUsers } from "../repositories/users.repository.js";

export async function getUsersMe(req, res) {
    const userId = res.locals.user.user_id;

    try {
        const body = await getUsers(userId);

        res.send(body.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
}