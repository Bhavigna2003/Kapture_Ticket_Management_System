import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear authentication status
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    // Call logout callback to redirect
    navigate('/')
  };

  
  return (
    <div className="bg-slate-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Side: Title and Tickets Count */}
        <div className="text-xl font-bold">Ticketing App</div>
        <div className="flex items-center space-x-4">
         
          

          {/* Call Icon */}
          <div className="text-blue-500 cursor-pointer">
            <FontAwesomeIcon icon={faPhoneAlt} size="lg" />
          </div>

          {/* Notification Bell Icon */}
          <div className="text-blue-500 cursor-pointer">
            <FontAwesomeIcon icon={faBell} size="lg" />
          </div>

         

          <div className="text-xl font-bold"> Welcome {localStorage.getItem('username')} </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-white text-blue-500 rounded-md px-4 py-2 shadow-md hover:bg-blue-100 focus:outline-none"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
