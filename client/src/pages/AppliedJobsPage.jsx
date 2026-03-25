import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getApplications } from '../features/applications/applicationsSlice';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const AppliedJobsPage = () => {
  const dispatch = useDispatch();
  const { applications, isLoading, isError, message } = useSelector((state) => state.applications);

  useEffect(() => { dispatch(getApplications()); }, [dispatch]);

  useEffect(() => {
    if (isError && message) toast.error(message);
  }, [isError, message]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusClass = (status) => {
    if (!status || status.toLowerCase() === 'pending') return 'status-pending';
    if (status.toLowerCase() === 'accepted') return 'status-accepted';
    if (status.toLowerCase() === 'rejected') return 'status-rejected';
    return 'status-pending';
  };

  const getStatusLabel = (status) => {
    if (!status) return 'Pending';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>My Applications</h1>
        <span style={{ color: '#64748B', fontSize: '.9rem' }}>
          {applications.length} application{applications.length !== 1 ? 's' : ''}
        </span>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.2 }}>
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
          </div>
          <h3>You haven't applied to any jobs yet</h3>
          <p>Start browsing and apply to your first job</p>
          <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {applications.map((app) => (
            <div key={app._id} className="card card-no-hover slide-up">
              <div className="card-body applied-card">
                <div className="applied-card-info">
                  <div className="job-card-company">{app.job?.companyName}</div>
                  <div className="job-card-position">{app.job?.position}</div>
                  <div className="job-card-meta">
                    <span className={`job-card-badge ${app.job?.type === 'Full Time' ? 'badge-fulltime' : 'badge-parttime'}`}>
                      {app.job?.type}
                    </span>
                    <span className="job-card-location">{app.job?.location}</span>
                  </div>
                </div>
                <div className="applied-card-right">
                  <span className={`status-badge ${getStatusClass(app.status)}`}>
                    {getStatusLabel(app.status)}
                  </span>
                  <div className="applied-card-date">Applied {formatDate(app.appliedAt)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobsPage;
