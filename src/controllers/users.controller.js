export async function getUsersMe (req, res) {
    const userId = res.locals.user.user_id;
    
    try {
        const user = await db.query(`SELECT * FROM users WHERE id=$1;`, [userId]);
        const visitCount = await db.query(`SELECT links."visitCount" FROM links WHERE ;`);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}