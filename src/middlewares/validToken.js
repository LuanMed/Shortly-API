export async function tokenValidation (req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) return res.status(401).send('Você não possui um token');

    try {
        const user = await db.query(`SELECT * FROM sessions WHERE token=$1`, [token]);
        if (user.rowCount !== 0) return res.status(401).send('Você não tem autorização');

        res.locals.user = user.rows[0];
        
        next();

    } catch (error) {
        res.status(500).send(error.message);
    }
}