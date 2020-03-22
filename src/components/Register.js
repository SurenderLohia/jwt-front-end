import React, { useState } from 'react';
import { navigate } from '@reach/router';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await (await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })).json();

    if(!result.error) {
      console.log(result.message);
      navigate('/');
    } else {
      console.log(result.error);
    }
  }

  const handleChange = e => {
    if(e.currentTarget.name === 'email') {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="login-input">
          <input
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
            placeholder="Email"
            autoComplete="email"
          />
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
            autoComplete="password"
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register;