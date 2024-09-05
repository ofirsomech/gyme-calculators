// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-center space-x-4">
        <li><Link to="/" className="text-white hover:text-gray-200">מחשבון דלק</Link></li>
        <li><Link to="/compound-interest" className="text-white hover:text-gray-200">מחשבון ריבית דריבית</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;