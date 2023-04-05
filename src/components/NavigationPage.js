import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/"><FaHome />Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;