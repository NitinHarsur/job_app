import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to={user?.role === 'admin' ? '/admin/dashboard' : '/jobs'} className="navbar-brand">
        Job<span>App</span>
      </Link>

      <div className="navbar-links">
        {user ? (
          <>
            {user.role === 'admin' ? (
              <>
                <NavLink to="/admin/dashboard">Dashboard</NavLink>
                <NavLink to="/admin/jobs">My Jobs</NavLink>
                <NavLink to="/admin/jobs/new">Post Job</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/jobs">All Jobs</NavLink>
                <NavLink to="/applied">Applied</NavLink>
              </>
            )}
            <div className="navbar-user">
              <span className="navbar-user-name">{user.name}</span>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
