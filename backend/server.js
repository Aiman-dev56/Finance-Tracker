require("dotenv").config();
const express = require("express");
const cors = require("cors");


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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});