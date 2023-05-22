import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@molecules/button/Button';
import Input from '@molecules/input/Input';
import { authService } from '@services/api/auth/auth.service';
import { UtilsService } from '@services/utils/utils.service';
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
    try {
      const avatarColor = UtilsService.avatarColor();
      const avatarImage = UtilsService.generateAvatar(username.charAt(0).toUpperCase(), avatarColor);
      const result = await authService.signUp({
        username,
        email,
        password,
        avatarColor,
        avatarImage
      });
      console.log(result);
      setUser(result.data.user);
      setHasError(false);
      setAlertType('alert-success');
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setAlertType('alert-error');
      setErrorMessage(error?.response?.data.message);
    }
  };

  useEffect(() => {
    if (loading && !user) return;
    if (user) navigate('/app/social/streams');
  }, [loading, navigate, user]);

  return (
    <div className="auth-inner">
      {hasError && errorMessage && (
        <div className={`alerts ${alertType}`} role="alert">
          {errorMessage}
        </div>
      )}
      <form className="auth-form" onSubmit={registerUser}>
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value={username}
            labelText="Username"
            placeholder="Enter Username"
            style={{ border: `${hasError} ? '1px solid #fa9b8a': ''` }}
            handleChange={(event) => setUsername(event.target.value)}
          />
          <Input
            id="email"
            name="email"
            type="text"
            value={email}
            labelText="Email"
            placeholder="Enter Email"
            style={{ border: `${hasError} ? '1px solid #fa9b8a': ''` }}
            handleChange={(event) => setEmail(event.target.value)}
          />
          <Input
            id="password"
            name="password"
            type="text"
            value={password}
            labelText="Password"
            placeholder="Enter Password"
            style={{ border: `${hasError} ? '1px solid #fa9b8a': ''` }}
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
