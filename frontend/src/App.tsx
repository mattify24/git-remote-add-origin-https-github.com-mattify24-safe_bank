import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Cards from './pages/Cards';
import Statements from './pages/Statements';
import Transactions from './pages/Transactions';
import Transfer from './pages/Transfer';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/statements" element={<Statements />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;