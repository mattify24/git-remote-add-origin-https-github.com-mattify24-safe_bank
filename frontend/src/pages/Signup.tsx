import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // Signup successful, redirect to login
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Sign Up</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="block w-full mb-4 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="block w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
    </form>
  );
};

export default Signup;