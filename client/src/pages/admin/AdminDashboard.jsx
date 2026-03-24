import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyJobs } from '../../features/jobs/jobsSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { myJobs, isLoading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMyJobs());
  }, [dispatch]);

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <Link to="/admin/jobs/new" className="btn btn-primary">
          + Post New Job
        </Link>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 'var(--space-lg)',
          marginBottom: 'var(--space-xl)',
        }}
      >
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-accent)' }}>
              {isLoading ? '...' : myJobs.length}
            </div>
            <div style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '4px' }}>
              Jobs Posted
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-accent)' }}>
              {user?.name}
            </div>
            <div style={{ color: '#64748B', fontSize: '0.9rem', marginTop: '4px' }}>
              Welcome back!
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
        <Link to="/admin/jobs" className="btn btn-outline">
          📋 Manage Jobs
        </Link>
        <Link to="/admin/jobs/new" className="btn btn-outline">
          ✏️ Create New Job
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
