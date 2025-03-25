import React from 'react';
import AuthLayout from './AuthLayout';
import SignupForm from '../../components/SignupForm/SignupForm'; 

export default {
  title: 'Layouts/AuthLayout',
  component: AuthLayout,
  parameters: {
    layout: 'fullscreen'
  }
};


export const Default = {
  render: () => (
    <AuthLayout>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        height: '100%' 
      }}>
        <SignupForm />
      </div>
    </AuthLayout>
  )
};


export const WithTextContent = {
  render: () => (
    <AuthLayout>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        height: '100%',
        backgroundColor: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h2>Welcome to the Authentication Page</h2>
      </div>
    </AuthLayout>
  )
};


export const EmptyState = {
  render: () => (
    <AuthLayout>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        height: '100%',
        backgroundColor: 'white'
      }}>
        <p>No content provided</p>
      </div>
    </AuthLayout>
  )
};