import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { navigate } from '@reach/router';


const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await (await fetch('http://localhost:4000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })).json();

    if(result.accessToken) {
      setUser({
        accessToken: result.accessToken
      });
      navigate('/');
    } else {
      console.log(result.error);
    }
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

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
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login;