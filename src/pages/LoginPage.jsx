// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import './LoginPage.css';  // Import CSS

function LoginPage() {
  // 🎯 LOGIC DISINI
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    console.log('Login clicked');
    // Logic login disini
  };


  
  
  // 🎨 TAMPILAN DISINI (return JSX)
  return (
    <div className="login-container">
      <h1>Login</h1>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}



export default LoginPage;