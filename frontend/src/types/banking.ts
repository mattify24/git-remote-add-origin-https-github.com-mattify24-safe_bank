
export interface User {
  id: string;
  email: string;
  password_hash?: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
  status: 'active' | 'suspended' | 'closed';
}

export interface Account {
  id: string;
  user_id: string;
  account_number: string;
  account_type: 'checking' | 'savings' | 'credit';
  balance: number;
  currency: string;
  status: 'active' | 'frozen' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  account_id: string;
  transaction_type: 'debit' | 'credit' | 'transfer';
  amount: number;
  description: string;
  reference_number: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export interface Card {
  id: string;
  account_id: string;
  card_number: string;
  card_type: 'debit' | 'credit';
  expiry_date: string;
  status: 'active' | 'blocked' | 'expired';
}

export interface Transfer {
  id: string;
  from_account_id: string;
  to_account_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}
