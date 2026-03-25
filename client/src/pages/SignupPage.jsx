import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signup, resetAuthState } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    dispatch(signup(formData));
  };

  return (
    <div className="auth-container">
      <div className="auth-card card slide-up">
        <div className="card-body">
          <div className="auth-logo">Job<span>Board</span></div>
          <h1>Create Account</h1>
          <p className="auth-subtitle">
            Sign up to get started. Use an <strong>@arnifi.com</strong> email for admin access.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="signup-name">Full Name</label>
              <input id="signup-name" type="text" name="name" className="form-input" placeholder="Enter your full name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="signup-email">Email</label>
              <input id="signup-email" type="email" name="email" className="form-input" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label htmlFor="signup-password">Password</label>
              <div className="password-wrapper">
                <input id="signup-password" type={showPwd ? 'text' : 'password'} name="password" className="form-input" placeholder="Create a password (min 6 chars)" value={formData.password} onChange={handleChange} />
                  <button type="button" className="password-toggle" onClick={() => setShowPwd(!showPwd)} aria-label="Toggle password" style={{ fontSize: '.75rem', fontWeight: 600, textTransform: 'uppercase' }}>{showPwd ? 'Hide' : 'Show'}</button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
