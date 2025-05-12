import React from 'react';
import styles from './AuthLayout.module.css'; // Import the CSS module
import geometricShape from '/src/assets/geometric-shape.svg?url';

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authContainer}>
        
        <div className={styles.authLeft}>
          <h1>EduVault</h1>
          <h2>Learn with us</h2>
          <div className={styles.geometricImage}>
            <img src={geometricShape} alt="Geometric Shape" />
          </div>
        </div>

        <div className={styles.authRight}>
          <div className={styles.authContent}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;