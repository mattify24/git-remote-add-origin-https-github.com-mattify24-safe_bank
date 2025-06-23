
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Eye, EyeOff, Lock, Unlock, Plus, Settings } from 'lucide-react';

const Cards = () => {
  const [showCardNumbers, setShowCardNumbers] = useState(false);

  const cards = [
    {
      id: '1',
      type: 'debit',
      name: 'Primary Debit Card',
      number: '4532 1234 5678 9012',
      maskedNumber: '**** **** **** 9012',
      expiry: '12/27',
      status: 'active',
      account: 'Checking ****1234',
      limit: null,
      spent: null
    },
    {
      id: '2',
      type: 'credit',
      name: 'Rewards Credit Card',
      number: '5412 3456 7890 1234',
      maskedNumber: '**** **** **** 1234',
      expiry: '09/26',
      status: 'active',
      account: 'Credit ****9012',
      limit: 5000,
      spent: 1250
    },
    {
      id: '3',
      type: 'debit',
      name: 'Savings Debit Card',
      number: '4111 2345 6789 0123',
      maskedNumber: '**** **** **** 0123',
      expiry: '03/28',
      status: 'blocked',
      account: 'Savings ****5678',
      limit: null,
      spent: null
    }
  ];

  const getCardBackground = (type: string) => {
    return type === 'credit' 
      ? 'bg-gradient-to-br from-purple-600 to-purple-800' 
      : 'bg-gradient-to-br from-blue-600 to-blue-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'blocked': return 'text-red-600 bg-red-100';
      case 'expired': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Cards</h1>
            <p className="text-gray-600 mt-1">Manage your debit and credit cards</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowCardNumbers(!showCardNumbers)}
              className="flex items-center space-x-2"
            >
              {showCardNumbers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showCardNumbers ? 'Hide' : 'Show'} Numbers</span>
            </Button>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Request New Card</span>
            </Button>
          </div>
        </div>

        {/* Cards Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.id} className="space-y-4">
              {/* Card Visual */}
              <div className={`${getCardBackground(card.type)} rounded-xl p-6 text-white h-48 relative overflow-hidden`}>
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(card.status)}`}>
                    {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <p className="text-white/80 text-sm">{card.type.toUpperCase()} CARD</p>
                    <p className="text-white font-medium mt-1">{card.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-white/80 text-xs mb-1">CARD NUMBER</p>
                    <p className="text-white font-mono text-lg tracking-wider">
                      {showCardNumbers ? card.number : card.maskedNumber}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/80 text-xs">EXPIRES</p>
                      <p className="text-white font-mono">{card.expiry}</p>
                    </div>
                    <div className="text-right">
                      <CreditCard className="h-8 w-8 text-white/60" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <Card className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Linked Account</span>
                    <span className="font-medium">{card.account}</span>
                  </div>
                  
                  {card.type === 'credit' && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Credit Limit</span>
                        <span className="font-medium">${card.limit?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Amount Spent</span>
                        <span className="font-medium text-red-600">${card.spent?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Available Credit</span>
                        <span className="font-medium text-green-600">
                          ${((card.limit || 0) - (card.spent || 0)).toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="pt-3 border-t flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      {card.status === 'active' ? (
                        <>
                          <Lock className="h-3 w-3 mr-1" />
                          Block
                        </>
                      ) : (
                        <>
                          <Unlock className="h-3 w-3 mr-1" />
                          Unblock
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="h-3 w-3 mr-1" />
                      Settings
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Card Services */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Card Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Lock className="h-6 w-6" />
              <span className="text-sm">Freeze Card</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Settings className="h-6 w-6" />
              <span className="text-sm">Card Limits</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <CreditCard className="h-6 w-6" />
              <span className="text-sm">Replace Card</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Plus className="h-6 w-6" />
              <span className="text-sm">Add Card</span>
            </Button>
          </div>
        </Card>

        {/* Recent Card Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Card Activity</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Grocery Store Purchase</p>
                <p className="text-sm text-gray-600">Debit Card ****9012 • Today 2:30 PM</p>
              </div>
              <span className="font-semibold text-red-600">-$85.42</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Online Shopping</p>
                <p className="text-sm text-gray-600">Credit Card ****1234 • Yesterday 6:15 PM</p>
              </div>
              <span className="font-semibold text-red-600">-$129.99</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Gas Station</p>
                <p className="text-sm text-gray-600">Debit Card ****9012 • Yesterday 8:45 AM</p>
              </div>
              <span className="font-semibold text-red-600">-$45.20</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Cards;
