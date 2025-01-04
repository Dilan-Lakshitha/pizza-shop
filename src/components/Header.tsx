import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header className="bg-gray-800 text-white p-4">
    <nav className="flex justify-between">
      <Link to="/" className="text-xl font-bold">Pizza Shop</Link>
    </nav>
  </header>
);

export default Header;
