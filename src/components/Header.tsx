import React from 'react';
import { Link } from 'react-router-dom';
import Pepperoni from '../assest/pngegg (1).png';

const Header: React.FC = () => (
  <header className="bg-gray-900 text-white p-5 border-l">
    <nav className="flex justify-between items-center">
      <div className="flex items-center bg-gray-700 text-white rounded-md px-3 py-1">
        <input
          type="text"
          placeholder="Search for pizzas..."
          className="bg-transparent border-none focus:outline-none text-white w-100"
        />
        <button
          type="submit"
          className="ml-2 text-gray-300 hover:text-white transition"
        >
        </button>
      </div>
      <img
        src={Pepperoni}
        alt="Pepperoni"
        className="h-10 w-12"
      />
    </nav>
  </header>
);

export default Header;
