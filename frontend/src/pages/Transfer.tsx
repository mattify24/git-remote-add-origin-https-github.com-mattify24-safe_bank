
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight, Send, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Transfer = () => {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const accounts = [
    { id: '1', name: 'Primary Checking', number: '****1234', balance: 5420.50 },
    { id: '2', name: 'Emergency Fund Savings', number: '****5678', balance: 12750.00 },
    { id: '3', name: 'Rewards Credit Card', number: '****9012', balance: -1250.00 }
  ];

  const recentTransfers = [
    { id: '1', from: 'Checking ****1234', to: 'Savings ****5678', amount: 500.00, date: '2024-01-14' },
    { id: '2', from: 'Savings ****5678', to: 'Checking ****1234', amount: 200.00, date: '2024-01-10' },
    { id: '3', from: 'Checking ****1234', to: 'Credit ****9012', amount: 300.00, date: '2024-01-08' }
  ];

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromAccount || !toAccount || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (fromAccount === toAccount) {
      toast({
        title: "Error",
        description: "Source and destination accounts must be different",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Transfer amount must be greater than zero",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Transfer Successful",
        description: `$${amount} has been transferred successfully`,
      });
      
      // Reset form
      setFromAccount('');
      setToAccount('');
      setAmount('');
      setDescription('');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transfer Money</h1>
          <p className="text-gray-600 mt-1">Transfer funds between your accounts instantly</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transfer Form */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <ArrowLeftRight className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold">New Transfer</h2>
            </div>

            <form onSubmit={handleTransfer} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Account *
                </label>
                <select
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select source account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({account.number}) - ${account.balance.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Account *
                </label>
                <select
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select destination account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({account.number})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this transfer for?"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  'Processing...'
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Transfer Money
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Recent Transfers */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <History className="h-5 w-5 text-gray-600" />
              <h2 className="text-xl font-semibold">Recent Transfers</h2>
            </div>

            <div className="space-y-4">
              {recentTransfers.map((transfer) => (
                <div key={transfer.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      ${transfer.amount.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">{transfer.date}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span>From: {transfer.from}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span>To: {transfer.to}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              View All Transfers
            </Button>
          </Card>
        </div>

        {/* Quick Transfer Options */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Transfer</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <span className="text-lg font-bold">$100</span>
              <span className="text-sm">Emergency Fund</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <span className="text-lg font-bold">$250</span>
              <span className="text-sm">Savings Goal</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <span className="text-lg font-bold">$500</span>
              <span className="text-sm">Monthly Save</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <span className="text-lg font-bold">Custom</span>
              <span className="text-sm">Enter Amount</span>
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Transfer;
