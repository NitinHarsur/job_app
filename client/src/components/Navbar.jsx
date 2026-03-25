import { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide navbar on landing page (it has its own nav built into hero)
  if (location.pathname === '/' && !user) return null;

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <Link
        to={user ? (user.role === 'admin' ? '/admin/dashboard' : '/jobs') : '/'}
        className="navbar-brand"
        onClick={closeMenu}
      >
        Job<span>Board</span>
      </Link>

      {/* Desktop Center Links */}
      <div className="navbar-center">
        {user ? (
          user.role === 'admin' ? (
            <>
              <NavLink to="/admin/jobs/new" onClick={closeMenu}>Post Job</NavLink>
              <NavLink to="/admin/jobs" onClick={closeMenu}>My Job Listings</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/jobs" onClick={closeMenu}>Browse Jobs</NavLink>
              <NavLink to="/applied" onClick={closeMenu}>Applied Jobs</NavLink>
            </>
          )
        ) : (
          <div className="navbar-auth-links">
            <Link to="/login" className="btn btn-outline-white btn-sm" onClick={closeMenu}>Login</Link>
            <Link to="/signup" className="btn btn-primary btn-sm" onClick={closeMenu}>Get Started</Link>
          </div>
        )}
      </div>

      {/* Desktop Right */}
      <div className="navbar-right">
        {user && (
          <>
            {user.role === 'admin' && <span className="navbar-admin-badge">Admin</span>}
            <div className="navbar-avatar">{getInitials(user.name)}</div>
            <span className="navbar-user-name">{user.name}</span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>

      {/* Hamburger */}
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {user ? (
          <>
            {user.role === 'admin' ? (
              <>
                <NavLink to="/admin/dashboard" onClick={closeMenu}>Dashboard</NavLink>
                <NavLink to="/admin/jobs/new" onClick={closeMenu}>Post Job</NavLink>
                <NavLink to="/admin/jobs" onClick={closeMenu}>My Job Listings</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/jobs" onClick={closeMenu}>Browse Jobs</NavLink>
                <NavLink to="/applied" onClick={closeMenu}>Applied Jobs</NavLink>
              </>
            )}
            <div className="navbar-user-info">
              <div className="navbar-avatar">{getInitials(user.name)}</div>
              <span className="navbar-user-name">{user.name}</span>
              {user.role === 'admin' && <span className="navbar-admin-badge">Admin</span>}
            </div>
            <button onClick={handleLogout} style={{ color: '#EF4444' }}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
            <NavLink to="/signup" onClick={closeMenu}>Sign Up</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
