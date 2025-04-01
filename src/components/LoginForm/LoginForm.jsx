import React, { useState } from 'react';
import styles from './LoginForm.module.css';

const LoginForm = ({ onToggleForm }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Login</h2>
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
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
        <p className={styles.loginLink}>
          New User? <span onClick={onToggleForm}>Signup</span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;