import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import JobsListingPage from './pages/JobsListingPage';
import AppliedJobsPage from './pages/AppliedJobsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminJobForm from './pages/admin/AdminJobForm';
import AdminJobListing from './pages/admin/AdminJobListing';

function AppRoutes() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Landing page */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/jobs'} replace />
          ) : (
            <LandingPage />
          )
        }
      />

      {/* Auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* User routes */}
      <Route path="/jobs" element={<ProtectedRoute><JobsListingPage /></ProtectedRoute>} />
      <Route path="/applied" element={<ProtectedRoute><AppliedJobsPage /></ProtectedRoute>} />

      {/* Admin routes */}
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/jobs" element={<AdminRoute><AdminJobListing /></AdminRoute>} />
      <Route path="/admin/jobs/new" element={<AdminRoute><AdminJobForm /></AdminRoute>} />
      <Route path="/admin/jobs/edit/:id" element={<AdminRoute><AdminJobForm /></AdminRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: 'toast-custom',
          style: { fontFamily: "'DM Sans', sans-serif" },
          success: { style: { borderLeft: '4px solid #22C55E' } },
          error: { style: { borderLeft: '4px solid #EF4444' } },
        }}
      />
    </Router>
  );
}

export default App;
