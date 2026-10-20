const pool = require("../config/db");


async function getTransactions(req, res) {
    try{
        const result = await pool.query(
            `SELECT  id, type, title, amount, category,
            payment_method,transaction_date, notes
            FROM transactions
            WHERE user_id = $1
            ORDER BY transaction_date DESC, id DESC`,
            [req.user.id]
        );
        res.json({ transactions: result.rows});
} catch (error) {
console.error(error.message);
res.status(500).json({
    message: "Unable to fetch transactions.",
});
    }
}

async function createTransaction(req, res) {
    try{
        const {
            type,
            title,
            amount,
            category,
            payment_method,
            transaction_date,
            notes
        } = req.body;

        if(
            !["income", "expense"].includes(type) ||
            typeof title !== "string" || !title.trim() ||
            title.length > 150 || 
            typeof category !== "string" || 
            !category.trim() || category.length > 100 ||
            !Number.isFinite(amount) || amount <= 0 ||
            !Number.isSafeInteger(Math.round(amount * 100))
        ) {
            return res.status(400).json({
                message: "Please provide valid transaction details."
            });
        }

        const result = await pool.query(
            `INSERT INTO transactions (
            user_id, type, title, amount, category, payment_method, transaction_date, notes)
            VALUES ($1, $2, $3, $4, $5, $6,
            COALESCE($7::date, CURRENT_DATE), $8)
            RETURNING *`,
            [req.user.id, type, title.trim(), amount, category.trim(), payment_method || null, transaction_date || null, notes || null]
        );
        res.status(201).json({ message: "Transaction created successfully.",
            transaction : result.rows[0],
         });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Unable to create transaction.",
        });

    }
}

module.exports = {
    getTransactions,
    createTransaction,
}