import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) return <Navigate to="/" replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://localhost:7050/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Login failed');
      }

      const data = await res.json();
      const token = data.token;

      // Save token to localStorage or context
      localStorage.setItem('token', token);

      // Optionally, save user details in context
      login({ username: formData.username, token });

      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Welcome To Ecmmerce Shop</h2>
      <hr />
      <Container className="shadow px-4 pt-1 pb-4">
        <h4 className="mt-5">Login</h4>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <Button variant="primary" type="submit">
              Log In
            </Button>
            <Button
              className="ms-3"
              variant="secondary"
              type="reset"
              onClick={() => {
                setFormData({ username: '', password: '' });
                setError('');
              }}
            >
              Reset
            </Button>
          </Form>
        )}
      </Container>
    </Container>
  );
}

export default Login;
