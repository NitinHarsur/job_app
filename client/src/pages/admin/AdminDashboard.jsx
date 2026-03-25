import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyJobs } from '../../features/jobs/jobsSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { myJobs, isLoading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => { dispatch(getMyJobs()); }, [dispatch]);

  const totalJobs = myJobs.length;

  return (
    <div className="page-container fade-in">
      {/* Welcome Card */}
      <div className="welcome-banner">
        <h2>Welcome, Admin {user?.name}</h2>
        <p>Manage your job listings and track applications</p>
      </div>

      {/* Stats Row */}
      <div className="stats-grid">
        <div className="card stat-card">
          <div className="card-body">
            <div className="stat-value">{isLoading ? '...' : totalJobs}</div>
            <div className="stat-label">Total Jobs Posted</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="card-body">
            <div className="stat-value">{isLoading ? '...' : '—'}</div>
            <div className="stat-label">Total Applications</div>
          </div>
        </div>
        <div className="card stat-card">
          <div className="card-body">
            <div className="stat-value" style={{ fontSize: '1.2rem' }}>
              {isLoading ? '...' : (myJobs[0]?.position || '—')}
            </div>
            <div className="stat-label">Most Recent Job</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
        <Link to="/admin/jobs/new" className="btn btn-primary btn-lg">+ Post New Job</Link>
        <Link to="/admin/jobs" className="btn btn-outline btn-lg">📋 View All My Jobs</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
