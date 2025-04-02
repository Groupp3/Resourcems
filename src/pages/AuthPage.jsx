import React, { useState } from 'react';
import AuthLayout from "../layouts/AuthLayout/AuthLayout"; 
import SignupForm from "../components/SignupForm/SignupForm";
import LoginForm from "../components/LoginForm/LoginForm";

const AuthPage = () => {
  const [isLoginForm, setIsLoginForm] = useState(false);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <AuthLayout>
      {isLoginForm ? (
        <SignupForm onToggleForm={toggleForm} />
      ) : (
        
        <LoginForm onToggleForm={toggleForm} />
      )}
    </AuthLayout>
  );
};

export default AuthPage;