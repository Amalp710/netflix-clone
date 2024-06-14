import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import caret_icon from '../../assets/caret_icon.svg';
import profile_img from '../../assets/profile_img.png';
import { logout } from '../../Firebase';

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false); // State to control search bar visibility

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchQuery.trim() !== '') {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar); // Toggle search bar visibility
  };

  return (
    <div className='navbar'>
      <div className='left-navbar'>
        <img className='logo' src={logo} alt="netflix logo" />
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/tv-shows')}>TV Shows</li>
          <li>Movies</li>
          <li>New And Popular</li>
          <li>My List</li>
          <li>Browse by language</li>
        </ul>
      </div>
      <div className='right-navbar'>
        <img
          className='sIcons'
          src={search_icon}
          alt="search"
          onClick={toggleSearchBar}
        />
        {showSearchBar && (
          <form onSubmit={handleSearch} className='search-bar-form'>
            <div className='search-bar'>
              <input
                type='text'
                placeholder='Search movies...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type='submit'>
                <img className='sIcons' src={search_icon} alt="search" />
              </button>
            </div>
          </form>
        )}
        <p onClick={() => navigate('/children-shows')}>Children</p>
        <img className='bIcons' src={bell_icon} alt="bell" />
        <div className='navbar-avatar'>
          <img className='avatar' src={profile_img} alt="avatar" />
          <img className='dIcons' src={caret_icon} alt="dropdown" />
          <div className='dropdown'>
            <p onClick={() => { logout() }}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
