import React from "react";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout"; 
import SignupForm from "../../components/SignupForm/SignupForm";

const SignupPage = () => {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
};

export default SignupPage;
