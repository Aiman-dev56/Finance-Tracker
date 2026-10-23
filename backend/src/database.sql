CREATE TABLE users (
    id BIGINT GENERTATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL, 
    created_at TIMESTAMTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE transactions(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL 
    REFRENCES users(id) ON DELETE CASCADE,

    type VARCHAR(10) NOT NULL 
    CHECK (type IN ('income', 'expense')),

    title VARCHAR(150) NOT NULL,
    amount NUMERIC(14, 2) NOT NULL
    CHECK (amount > 0),

    category VARCHAR(80) NOT NULL,
    payment_method VARCHAR(40) 
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO transactions(
    user_id,
    type,
    title,
    amount,
    category,
    payment_method,
    transaction_date,
    notes
)

VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
)
RETURNING *;

CREATE INDEX idx_transactions_user_date 
ON transactions(user_id, transaction_date DESC);

UPDATE transactions
SET title = $1
WHERE id = $2 AND user_id = $3
RETURNING *;

DELETE FROM transactions 
WHERE id = $1 AND user_id = $2
RETURNING id;

SELECT 
COALESCE(
    SUM(amount) FILTER (WHERE type = 'income'), 0
) AS total_income,

COALESCE(
    SUM(amount) FILTER (WHERE type = 'expense'), 0
) AS total_expenses,

COALESCE(
    SUM(
        CASE
        WHEN type = 'income' THEN amount
        ELSE -amount
        END
    ), 0
) AS net_balance

FROM transactions
WHERE user_id = $1;


SELECT 
DATE_TRUNC('month', transaction_date)::date AS month,

COALESCE(
    SUM(amount) FILTER (WHERE type = 'income'), 0
) AS income,

COALESCE(
    SUM(amount) FILTER (WHERE type = 'expense'), 0
) AS expenses

FROM transactions
 WHERE user_id = $1
GROUP BY DATE_TRUNC('month', transaction_date)
ORDER BY month;

