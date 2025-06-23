
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Search, Filter, Download } from 'lucide-react';

const Transactions = () => {
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const transactions = [
    {
      id: '1',
      date: '2024-01-15',
      description: 'Grocery Store - Whole Foods',
      type: 'debit',
      amount: -85.42,
      account: 'Checking ****1234',
      status: 'completed',
      reference: 'TXN001'
    },
    {
      id: '2',
      date: '2024-01-15',
      description: 'Salary Deposit - ABC Corp',
      type: 'credit',
      amount: 3200.00,
      account: 'Checking ****1234',
      status: 'completed',
      reference: 'TXN002'
    },
    {
      id: '3',
      date: '2024-01-14',
      description: 'Gas Station - Shell',
      type: 'debit',
      amount: -45.20,
      account: 'Checking ****1234',
      status: 'completed',
      reference: 'TXN003'
    },
    {
      id: '4',
      date: '2024-01-14',
      description: 'Transfer to Savings',
      type: 'transfer',
      amount: -500.00,
      account: 'Checking ****1234',
      status: 'completed',
      reference: 'TXN004'
    },
    {
      id: '5',
      date: '2024-01-13',
      description: 'Online Shopping - Amazon',
      type: 'debit',
      amount: -129.99,
      account: 'Credit ****9012',
      status: 'completed',
      reference: 'TXN005'
    },
    {
      id: '6',
      date: '2024-01-12',
      description: 'Interest Payment',
      type: 'credit',
      amount: 15.50,
      account: 'Savings ****5678',
      status: 'completed',
      reference: 'TXN006'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'debit': return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case 'credit': return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'transfer': return <ArrowLeftRight className="h-4 w-4 text-blue-600" />;
      default: return <ArrowLeftRight className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'completed':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Completed</span>;
      case 'pending':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending</span>;
      case 'failed':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Failed</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transaction History</h1>
            <p className="text-gray-600 mt-1">View and manage all your transactions</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Accounts</option>
              <option value="checking">Checking ****1234</option>
              <option value="savings">Savings ****5678</option>
              <option value="credit">Credit ****9012</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
              <option value="transfer">Transfer</option>
            </select>

            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>
        </Card>

        {/* Transactions Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{transaction.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTransactionIcon(transaction.type)}
                      <span>{transaction.description}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  <TableCell className="capitalize">{transaction.type}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className="text-gray-500">{transaction.reference}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Transaction Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <ArrowDownLeft className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Total Credits</h3>
            <p className="text-2xl font-bold text-green-600">$3,215.50</p>
            <p className="text-sm text-gray-600">This month</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-red-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <ArrowUpRight className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Total Debits</h3>
            <p className="text-2xl font-bold text-red-600">$760.61</p>
            <p className="text-sm text-gray-600">This month</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <ArrowLeftRight className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Net Flow</h3>
            <p className="text-2xl font-bold text-blue-600">+$2,454.89</p>
            <p className="text-sm text-gray-600">This month</p>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;
