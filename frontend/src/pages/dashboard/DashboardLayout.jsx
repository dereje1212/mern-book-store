import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import './DashboardLayout.css';


const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  // Example: user info could come from context or Redux
  const user = {
    name: "Dereje",
    role: "Developer",
    avatar: "", // if empty, fallback will be used
  };

  return (
    <section className="dashboard-container">
      <aside className="sidebar">
        <a href="/" className="logo">
          <img src="/footer-logo.png" alt="Logo" />
        </a>
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item active">
            <span className="sr-only">Dashboard</span>
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon-svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </Link>
          <Link to="/dashboard/add-new-book" className="nav-item">
            <HiViewGridAdd className="icon-svg" />
          </Link>
          <Link to="/dashboard/manage-books" className="nav-item">
            <MdOutlineManageHistory className="icon-svg" />
          </Link>
        </nav>
        <div className="sidebar-footer">
          <button className="settings-button">
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon-svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </aside>

      <div className="main-content">
        <header className="header">
          <div className="search-box">
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="search-icon">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input type="text" role="search" placeholder="Search..." className="search-input"/>
          </div>
          <div className="header-actions">
            <div className="user-info">
              <div className="user-text">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
              </div>
              {/* Use fallback if avatar is empty */}
              <img
                className="user-avatar"
                src={user.avatar || "/photo_2025-11-25_10-42-30.jpg"}
                alt="user profile"
              />
              <button onClick={handleLogout} className="logout-button">
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="icon-svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <main className="dashboard-main">
          <div className="dashboard-header">
            <div>
              <h1>Dashboard</h1>
              <h2>Book Store Inventory</h2>
            </div>
            <div className="dashboard-actions">
              <Link to="/dashboard/manage-books" className="btn-outline">
                Manage Books
              </Link>
              <Link to="/dashboard/add-new-book" className="btn-primary">
                Add New Book
              </Link>
            </div>
          </div>

          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
