const JobCard = ({ job, onApply, isApplied, isApplying }) => {
  const typeBadgeClass = job.type === 'Full Time' ? 'badge-fulltime' : 'badge-parttime';

  return (
    <div className="card job-card slide-up">
      <div className="card-body">
        <div className="job-card-company">{job.companyName}</div>
        <div className="job-card-position">{job.position}</div>
        <div className="job-card-meta">
          <span className={`job-card-badge ${typeBadgeClass}`}>{job.type}</span>
          <span className="job-card-location">
            📍 {job.location}
          </span>
        </div>
        {onApply && (
          <div className="job-card-actions">
            {isApplied ? (
              <button className="btn btn-applied btn-sm" disabled>
                ✓ Applied
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onApply(job._id)}
                disabled={isApplying}
              >
                {isApplying ? 'Applying...' : 'Apply'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
