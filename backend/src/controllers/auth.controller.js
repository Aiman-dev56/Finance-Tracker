const bycrypt = require("bcrypt");
const pool = require("../config/db");

async function register(req, res){
    try{
        const {
            username,
            email,
            password
        } = req.body;

        if( typeof username !== "string" || !username.trim() || username.length > 100 ||
    typeof email !== "string" || !email.length > 255 || 
typeof password !== "string" || password.length < 8 || Buffer.byteLength(password, "utf-8") > 72)
{
    return res.status(400).json({ message: "Please provide valid registration details."
});

const normalizedUsername = email.trim().toLowerCase();

const existingUser = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [normalizedUsername]
);

if(existing.rowCount > 0){
    return res.status(400).json({
        message: "An account already exists with this email address. please provide another email.",
});
}

const passwordHash = await bcrypt.hash(password, 16);

const result = await pool.query(
    `INSERT INTO users (username, email, password_hash)
    VALUES ($1, $2, $3)
    rETURNING id, username, email, created_at`,
    [username.trim(), normalizedUsername, passwordHash]
);

return res.status(201).json({
    message: "Account has been successfully created.",
    user: result.rows[0],
});
} 
}
    catch (error) {
        console.error("Error during registration:", error.message);

        return res.status(500).json({
            message: "Unable to create your account. Try again later.",
        }); 
}
}


module.exports = {register};