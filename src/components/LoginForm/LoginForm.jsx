import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../service/AuthService';
import styles from './LoginForm.module.css';
import { useAuth } from '../../states/AuthContext'; // ✅ added

const LoginForm = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ use login from context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Clear old session data first
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('profileImageUrl');

      const response = await AuthService.login(formData.email, formData.password);
      console.log('Login Response:', response);

      const token = AuthService.getToken();
      if (token) {
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', token);
        localStorage.setItem('role', response.user.role);
        localStorage.setItem('profileImageUrl', response.user.profileImageUrl);

        login(response.user); // ✅ update context with user

        // ✅ role-based navigation
        if (response.user.role === 'ADMIN') {
          navigate('/admin');
        } else if (response.user.role === 'STUDENT') {
          navigate('/student');
        } else if (response.user.role === 'MENTOR') {
          navigate('/mentor');
        } else {
          navigate('/auth');
        }
      } else {
        console.error('Token is missing even after login!');
        setError('Authentication failed, please try again.');
      }

    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Login</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Email</label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.fullInput}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Password</label>
          <div className={styles.inputWrapper}>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.fullInput}
                required
                disabled={isLoading}
              />
              <button 
                type="button" 
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>

        <p className={styles.passwordHint}>
          Use 8 or more characters with a mix of letters, numbers & symbols
        </p>

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className={styles.loginLink}>
          New User? <span onClick={onToggleForm}>Signup</span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
