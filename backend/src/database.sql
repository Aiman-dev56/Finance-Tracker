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

CREATE INDEX idx_transactions_user_date 
ON transactions(user_id, transaction_date DESC);