import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import UsersPage from "./pages/UsersPage/UsersPage"; // Import UsersPage
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/users" element={<UsersPage />} /> {/* Route for UsersPage */}
      </Routes>
    </Router>
  );
}

export default App;
