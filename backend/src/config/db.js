const {pool} = require("pg");
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DB_SSL === "true" ?
    {rejectUnauthorized: true} : false,
});


module.exports = pool;