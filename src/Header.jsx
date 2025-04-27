import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
    
    <header className="site-header">
    <nav className="main-navigation">
  <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
    <span>Home</span>
  </NavLink>
  <NavLink to="/about" className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
    <span>About</span>
  </NavLink>
  <NavLink to="/services" className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
    <span>Services</span>
  </NavLink>
  <NavLink to="/explore" className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
    <span>Explore</span>
  </NavLink>
  <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}>
    <span>Support</span>
  </NavLink>
</nav>

        </header>
        </>
  )
}

export default Header;