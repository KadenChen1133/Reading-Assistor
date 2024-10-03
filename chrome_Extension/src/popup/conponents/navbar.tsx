import React, { useState } from 'react';
import './navbar.css';

const Navbar: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (option: string) => {
    console.log(`Selected option: ${option}`);
    setIsDropdownVisible(false);
  };

  return (
    <nav className='navbar'>
      <h1 className='navbar-name'>Readify</h1>
      <button className='navbar-dropdown' onClick={toggleDropdown}>
        Menu
      </button>
      <ul className={`dropdown-list ${isDropdownVisible ? 'show' : ''}`}>
        <li onClick={() => handleOptionClick('Settings')}>Settings</li>
        <li onClick={() => handleOptionClick('Rate this?')}>Rate this?</li>
      </ul>
    </nav>
  );
};

export default Navbar;
