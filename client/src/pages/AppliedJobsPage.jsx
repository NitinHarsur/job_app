import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApplications } from '../features/applications/applicationsSlice';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const AppliedJobsPage = () => {
  const dispatch = useDispatch();
  const { applications, isLoading, isError, message } = useSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>Applied Jobs</h1>
        <span style={{ color: '#64748B', fontSize: '0.9rem' }}>
          {applications.length} application{applications.length !== 1 ? 's' : ''}
        </span>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3>No applications yet</h3>
          <p>Start applying to jobs to see them here</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {applications.map((app) => (
            <div key={app._id} className="card slide-up">
              <div className="card-body applied-card">
                <div className="applied-card-info">
                  <div className="job-card-company">{app.job?.companyName}</div>
                  <div className="job-card-position">{app.job?.position}</div>
                  <div className="job-card-meta">
                    <span
                      className={`job-card-badge ${
                        app.job?.type === 'Full Time' ? 'badge-fulltime' : 'badge-parttime'
                      }`}
                    >
                      {app.job?.type}
                    </span>
                    <span className="job-card-location">📍 {app.job?.location}</span>
                  </div>
                </div>
                <div className="applied-card-date">
                  Applied {formatDate(app.appliedAt)}
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
