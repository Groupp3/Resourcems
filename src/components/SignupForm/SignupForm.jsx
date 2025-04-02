import React, { useState } from 'react';

import styles from './SignupForm.module.css';
import AuthService from '../../service/AuthService'; // Import your AuthService for registration


import AuthService from '../../services/AuthService'; // Import your AuthService for registration
 
const SignupForm = ({ onToggleForm }) => {

  const [formData, setFormData] = useState({

    firstName: '',

    lastName: '',

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
 
  // Handle form submit

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true); // Show loading spinner or any indication that request is in progress
 
    try {

      // Attempt to register the user

      const response = await AuthService.register(formData);
 
      if (response) {

        console.log('Registration successful:', response);

        // You can handle any post-registration actions here

        // For example, redirect the user to a login page or show a success message

        // Example: Redirect to login page

        alert('Registration successful! Please log in.');

        onToggleForm(); // Toggle the form to login

      }

    } catch (error) {

      console.error('Registration failed:', error);

      setError(error?.message || 'An error occurred during registration');

    } finally {

      setLoading(false); // Hide loading spinner after request completes

    }

  };
 
  return (
<div className={styles.formContainer}>
<h2 className={styles.formTitle}>Sign up now</h2>
<form onSubmit={handleSubmit} className={styles.form}>
<div className={styles.nameRow}>
<div className={styles.inputGroup}>
<label className={styles.inputLabel}>First Name</label>
<div className={styles.inputWrapper}>
<input

                type="text"

                name="firstName"

                value={formData.firstName}

                onChange={handleChange}

                className={styles.wideInput}

                required

              />
</div>
</div>
<div className={styles.inputGroup}>
<label className={styles.inputLabel}>Last Name</label>
<div className={styles.inputWrapper}>
<input

                type="text"

                name="lastName"

                value={formData.lastName}

                onChange={handleChange}

                className={styles.wideInput}

                required

              />
</div>
</div>
</div>
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

        {/* Error Message */}

        {error && <p className={styles.errorMessage}>{error}</p>}
 
        <button type="submit" className={styles.submitButton} disabled={loading}>

          {loading ? 'Registering...' : 'Sign up'}
</button>
 
        <p className={styles.loginLink}>

          Already have an account? <span onClick={onToggleForm}>Log in</span>
</p>
</form>
</div>

  );

};
 
export default SignupForm;

 