
import React from 'react';
import Layout from '../components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Plus, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

const Accounts = () => {
  const [showBalances, setShowBalances] = useState(true);

  const accounts = [
    {
      id: '1',
      type: 'Checking',
      name: 'Primary Checking',
      number: '****1234',
      fullNumber: '1234567890',
      balance: 5420.50,
      currency: 'USD',
      status: 'active',
      lastActivity: '2024-01-15'
    },
    {
      id: '2',
      type: 'Savings',
      name: 'Emergency Fund',
      number: '****5678',
      fullNumber: '1234567891',
      balance: 12750.00,
      currency: 'USD',
      status: 'active',
      lastActivity: '2024-01-10'
    },
    {
      id: '3',
      type: 'Credit',
      name: 'Rewards Credit Card',
      number: '****9012',
      fullNumber: '1234567892',
      balance: -1250.00,
      currency: 'USD',
      status: 'active',
      lastActivity: '2024-01-14'
    }
  ];

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'Checking': return '🏦';
      case 'Savings': return '💰';
      case 'Credit': return '💳';
      default: return '🏛️';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'frozen': return 'text-yellow-600 bg-yellow-100';
      case 'closed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Accounts</h1>
            <p className="text-gray-600 mt-1">Manage all your bank accounts in one place</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowBalances(!showBalances)}
              className="flex items-center space-x-2"
            >
              {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showBalances ? 'Hide' : 'Show'} Balances</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Open New Account</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {accounts.map((account) => (
            <Card key={account.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{getAccountIcon(account.type)}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{account.name}</h3>
                    <p className="text-gray-600">{account.type} Account</p>
                    <p className="text-sm text-gray-500">Account {account.number}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                      {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
                    </span>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {showBalances 
                        ? `${account.balance >= 0 ? '' : '-'}$${Math.abs(account.balance).toLocaleString()}`
                        : '••••••'
                      }
                    </p>
                    <p className="text-sm text-gray-600">Last activity: {account.lastActivity}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <Button size="sm">View Details</Button>
                  <Button size="sm" variant="outline">Transfer</Button>
                  <Button size="sm" variant="outline">Statements</Button>
                  {account.type === 'Credit' && (
                    <Button size="sm" variant="outline">Make Payment</Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Account Summary */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Assets</p>
              <p className="text-2xl font-bold text-green-600">
                {showBalances ? '$18,170.50' : '••••••'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Total Liabilities</p>
              <p className="text-2xl font-bold text-red-600">
                {showBalances ? '$1,250.00' : '••••••'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Net Worth</p>
              <p className="text-2xl font-bold text-blue-600">
                {showBalances ? '$16,920.50' : '••••••'}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Accounts;
