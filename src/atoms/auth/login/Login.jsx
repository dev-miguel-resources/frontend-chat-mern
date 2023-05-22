import { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Input from '@molecules/input/Input';
import Button from '@molecules/button/Button';
import { authService } from '@services/api/auth/auth.service';
import '@atoms/auth/login/Login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const loginUser = async (event) => {
    //
  };

  useEffect(() => {
    // ciclos de vida
  }, []);

  return (
    <div className="auth-inner">
      {hasError && errorMessage && (
        <div className={`alerts ${alertType}`} role="alert">
          {errorMessage}
        </div>
      )}
      <form className="auth-form" onSubmit={loginUser}></form>
    </div>
  );
};

export default Login;
