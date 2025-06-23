
-- SecureBank Database Schema
-- This file contains the SQL schema for the banking system

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'closed'))
);

-- Accounts Table
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    account_type VARCHAR(20) NOT NULL CHECK (account_type IN ('checking', 'savings', 'credit')),
    balance DECIMAL(15,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'frozen', 'closed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('debit', 'credit', 'transfer')),
    amount DECIMAL(15,2) NOT NULL,
    description TEXT,
    reference_number VARCHAR(50) UNIQUE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cards Table
CREATE TABLE cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
    card_number VARCHAR(20) NOT NULL, -- Should be encrypted in production
    card_type VARCHAR(10) NOT NULL CHECK (card_type IN ('debit', 'credit')),
    expiry_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'blocked', 'expired')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transfers Table
CREATE TABLE transfers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_account_id UUID NOT NULL REFERENCES accounts(id),
    to_account_id UUID NOT NULL REFERENCES accounts(id),
    amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT different_accounts CHECK (from_account_id != to_account_id)
);

-- Indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_accounts_account_number ON accounts(account_number);
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_cards_account_id ON cards(account_id);
CREATE INDEX idx_transfers_from_account ON transfers(from_account_id);
CREATE INDEX idx_transfers_to_account ON transfers(to_account_id);

-- Sample data for testing
INSERT INTO users (email, password_hash, first_name, last_name, phone, address) VALUES
('demo@bank.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Doe', '+1-555-0123', '123 Main St, New York, NY 10001'),
('jane@bank.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane', 'Smith', '+1-555-0124', '456 Oak Ave, Los Angeles, CA 90210');

-- Sample accounts
INSERT INTO accounts (user_id, account_number, account_type, balance) VALUES
((SELECT id FROM users WHERE email = 'demo@bank.com'), '1234567890', 'checking', 5420.50),
((SELECT id FROM users WHERE email = 'demo@bank.com'), '1234567891', 'savings', 12750.00),
((SELECT id FROM users WHERE email = 'demo@bank.com'), '1234567892', 'credit', -1250.00);

-- Sample transactions
INSERT INTO transactions (account_id, transaction_type, amount, description, reference_number, status) VALUES
((SELECT id FROM accounts WHERE account_number = '1234567890'), 'debit', 85.42, 'Grocery Store', 'TXN001', 'completed'),
((SELECT id FROM accounts WHERE account_number = '1234567890'), 'credit', 3200.00, 'Salary Deposit', 'TXN002', 'completed'),
((SELECT id FROM accounts WHERE account_number = '1234567890'), 'debit', 45.20, 'Gas Station', 'TXN003', 'completed');
