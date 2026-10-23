const express = require('express');
const { getTransactions, createTransaction} = require("../controllers/transaction.controller");
const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

router.use(requireAuth);

router.get("/", getTransactions);
router.post("/", createTransaction);

module.exports = router;