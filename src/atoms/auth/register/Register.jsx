import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@molecules/button/Button';
import Input from '@molecules/input/Input';
import { authService } from '@services/api/auth/auth.service';
import '@atoms/auth/register/Register.scss';

// Design Pattern Controlled Input or Control Props: https://reactpatterns.com/#controlled-input
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [hasError, setHasError] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const registerUser = async (event) => {
    setLoading(true);
    event.preventDefault();
  };

  // ciclos de vida
  useEffect(() => {}, []);

  return (
    <div>
      <form className="auth-form" onSubmit={registerUser}>
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value={username}
            labelText="Username"
            placeholder="Enter Username"
            style={{}}
            handleChange={(event) => setUsername(event.target.value)}
          />
          <Input
            id="email"
            name="email"
            type="text"
            value={email}
            labelText="Email"
            placeholder="Enter Email"
            style={{}}
            handleChange={(event) => setEmail(event.target.value)}
          />
          <Input
            id="password"
            name="password"
            type="text"
            value={password}
            labelText="Password"
            placeholder="Enter Password"
            style={{}}
            handleChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button
          label={`${loading ? 'SIGN UP IN PROGRESS...' : 'SIGN UP'}`}
          className="auth-button button"
          disabled={!username || !email || !password}
        />
      </form>
    </div>
  );
};

export default Register;
