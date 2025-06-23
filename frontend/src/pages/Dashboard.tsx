
import React from 'react';
import Layout from '../components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, CreditCard, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);

  // Mock data - in real app this would come from API
  const accounts = [
    { id: '1', type: 'Checking', number: '****1234', balance: 5420.50, currency: 'USD' },
    { id: '2', type: 'Savings', number: '****5678', balance: 12750.00, currency: 'USD' },
    { id: '3', type: 'Credit', number: '****9012', balance: -1250.00, currency: 'USD' },
  ];

  const recentTransactions = [
    { id: '1', description: 'Grocery Store', amount: -85.42, date: '2024-01-15', type: 'debit' },
    { id: '2', description: 'Salary Deposit', amount: 3200.00, date: '2024-01-15', type: 'credit' },
    { id: '3', description: 'Gas Station', amount: -45.20, date: '2024-01-14', type: 'debit' },
    { id: '4', description: 'Online Transfer', amount: -500.00, date: '2024-01-14', type: 'transfer' },
  ];

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Good morning, John!</h1>
          <p className="text-blue-100">Here's your financial overview for today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Balance</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {showBalance ? `$${totalBalance.toLocaleString()}` : '••••••'}
                  </p>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
                <p className="text-2xl font-bold text-gray-900">$3,200</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ArrowDownLeft className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Monthly Expenses</p>
                <p className="text-2xl font-bold text-gray-900">$1,630</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <ArrowUpRight className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Cards</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Accounts Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
            <div className="space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{account.type} Account</p>
                    <p className="text-sm text-gray-600">{account.number}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {account.balance >= 0 ? '+' : ''}${Math.abs(account.balance).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">{account.currency}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                  <p className={`font-semibold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Transactions
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex-col space-y-2">
              <ArrowUpRight className="h-6 w-6" />
              <span>Transfer Money</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <CreditCard className="h-6 w-6" />
              <span>Pay Bills</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <ArrowDownLeft className="h-6 w-6" />
              <span>Deposit Check</span>
            </Button>
            <Button className="h-20 flex-col space-y-2" variant="outline">
              <TrendingUp className="h-6 w-6" />
              <span>View Reports</span>
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
