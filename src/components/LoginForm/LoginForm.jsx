import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import AuthService from '../../services/AuthService'; // Adjust path as needed

const LoginForm = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before new request
    setIsLoading(true);

    try {
      const response = await AuthService.login(formData.email, formData.password);
      console.log('Login Response:', response);

      // Retrieve token after login
      const token = AuthService.getToken();
      console.log('Token after login:', token ? "Token exists" : "No token found"); 

      if (token) {
        if (response.role === 'ADMIN') {
          navigate('/admin'); // Redirect to admin panel
        } else {
          navigate('/user-dashboard'); // Adjust as needed for other roles
        }
      } else {
        console.error('Token is missing even after login!');
        setError('Authentication failed, please try again.');
      }

    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please check your credentials.'); // Display error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Login</h2>
      {error && <p className={styles.errorMessage}>{error}</p>} {/* Error message display */}

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