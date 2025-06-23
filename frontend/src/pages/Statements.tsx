
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Calendar } from 'lucide-react';

const Statements = () => {
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');

  const accounts = [
    { id: 'all', name: 'All Accounts' },
    { id: '1', name: 'Checking ****1234' },
    { id: '2', name: 'Savings ****5678' },
    { id: '3', name: 'Credit ****9012' }
  ];

  const statements = [
    {
      id: '1',
      account: 'Checking ****1234',
      period: 'January 2024',
      date: '2024-01-31',
      type: 'Monthly Statement',
      size: '245 KB',
      transactions: 23
    },
    {
      id: '2',
      account: 'Savings ****5678',
      period: 'January 2024',
      date: '2024-01-31',
      type: 'Monthly Statement',
      size: '189 KB',
      transactions: 8
    },
    {
      id: '3',
      account: 'Credit ****9012',
      period: 'January 2024',
      date: '2024-01-31',
      type: 'Monthly Statement',
      size: '312 KB',
      transactions: 15
    },
    {
      id: '4',
      account: 'Checking ****1234',
      period: 'December 2023',
      date: '2023-12-31',
      type: 'Monthly Statement',
      size: '298 KB',
      transactions: 31
    },
    {
      id: '5',
      account: 'Savings ****5678',
      period: 'December 2023',
      date: '2023-12-31',
      type: 'Monthly Statement',
      size: '156 KB',
      transactions: 6
    },
    {
      id: '6',
      account: 'Credit ****9012',
      period: 'December 2023',
      date: '2023-12-31',
      type: 'Monthly Statement',
      size: '387 KB',
      transactions: 28
    }
  ];

  const taxDocuments = [
    {
      id: '1',
      name: '2023 Tax Summary',
      description: 'Interest earned and fees paid',
      year: '2023',
      size: '127 KB',
      date: '2024-01-31'
    },
    {
      id: '2',
      name: '2023 1099-INT',
      description: 'Interest income statement',
      year: '2023',
      size: '98 KB',
      date: '2024-01-31'
    }
  ];

  const filteredStatements = statements.filter(statement => {
    if (selectedAccount !== 'all' && !statement.account.includes(selectedAccount)) {
      return false;
    }
    if (selectedYear !== 'all' && !statement.period.includes(selectedYear)) {
      return false;
    }
    return true;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Statements & Documents</h1>
            <p className="text-gray-600 mt-1">View and download your account statements</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Request Statement</span>
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account</label>
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Monthly Statements */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Statements</h2>
          <div className="space-y-3">
            {filteredStatements.map((statement) => (
              <div key={statement.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{statement.account}</h3>
                    <p className="text-sm text-gray-600">{statement.period} • {statement.transactions} transactions</p>
                    <p className="text-xs text-gray-500">{statement.size} • Generated on {statement.date}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>View</span>
                  </Button>
                  <Button size="sm" className="flex items-center space-x-1">
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tax Documents */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tax Documents</h2>
          <div className="space-y-3">
            {taxDocuments.map((document) => (
              <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{document.name}</h3>
                    <p className="text-sm text-gray-600">{document.description}</p>
                    <p className="text-xs text-gray-500">{document.size} • Available since {document.date}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>View</span>
                  </Button>
                  <Button size="sm" className="flex items-center space-x-1">
                    <Download className="h-3 w-3" />
                    <span>Download</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* eStatements Info */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Go Paperless with eStatements</h2>
          <p className="text-blue-800 mb-4">
            Switch to electronic statements to receive your documents faster and help the environment. 
            You'll get an email notification when your statement is ready.
          </p>
          <div className="flex space-x-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Enable eStatements
            </Button>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Learn More
            </Button>
          </div>
        </Card>

        {/* Statement Delivery Options */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Statement Delivery Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Current Settings</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Delivery Method</span>
                  <span className="font-medium">Electronic + Paper</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Email Address</span>
                  <span className="font-medium">demo@bank.com</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Frequency</span>
                  <span className="font-medium">Monthly</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Update Preferences</h3>
              <Button variant="outline" className="w-full">
                Manage Delivery Settings
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Statements;
