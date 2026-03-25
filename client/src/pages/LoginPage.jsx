import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, resetAuthState } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin/dashboard' : '/jobs', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
      dispatch(resetAuthState());
    }
  }, [isError, message, dispatch]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    dispatch(login(formData));
  };

  return (
    <div className="auth-container">
      <div className="auth-card card slide-up">
        <div className="card-body">
          <div className="auth-logo">Job<span>Board</span></div>
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="login-email">Email</label>
              <input id="login-email" type="email" name="email" className="form-input" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <div className="password-wrapper">
                <input id="login-password" type={showPwd ? 'text' : 'password'} name="password" className="form-input" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                <button type="button" className="password-toggle" onClick={() => setShowPwd(!showPwd)} aria-label="Toggle password" style={{ fontSize: '.75rem', fontWeight: 600, textTransform: 'uppercase' }}>{showPwd ? 'Hide' : 'Show'}</button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
