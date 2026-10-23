require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./src/config/db");


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message : "Backend is running successfully"});
});

app.get("/api/hello", (req, res) => {
    res.json({ status : "OK" });
});

app.get("/api/db-check", async (req, res) => {
    try{
        const result = await pool.query("SELECT NOW() AS time");
        res.json({
            connected : true,
            time: result.rows[0].time,
        });
    } catch (error) {
        console.error("Database connection error:", error.message);
        res.status(500).json({
            connected: false
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/api/transactions", require("./src/routes/transaction.routes"));