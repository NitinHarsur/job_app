const LOGO_COLORS = ['#5B6AF0', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#14B8A6'];

const getLogoColor = (name) => {
  if (!name) return LOGO_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return LOGO_COLORS[Math.abs(hash) % LOGO_COLORS.length];
};

const JobCard = ({ job, onApply, isApplied, isApplying }) => {
  const typeBadgeClass = job.type === 'Full Time' ? 'badge-fulltime' : 'badge-parttime';
  const logoColor = getLogoColor(job.companyName);
  const firstLetter = job.companyName ? job.companyName[0].toUpperCase() : '?';

  return (
    <div className="card job-card slide-up">
      <div className="card-body">
        <div className="job-card-header">
          <div className="company-logo" style={{ background: logoColor }}>{firstLetter}</div>
          <div className="job-card-company">{job.companyName}</div>
        </div>
        <div className="job-card-position">{job.position}</div>
        <div className="job-card-meta">
          <span className={`job-card-badge ${typeBadgeClass}`}>{job.type}</span>
          <span className="job-card-location">{job.location}</span>
        </div>
        {onApply && (
          <div className="job-card-actions">
            {isApplied ? (
              <button className="btn btn-applied btn-sm" disabled>✅ Applied</button>
            ) : (
              <button className="btn btn-primary" onClick={() => onApply(job._id)} disabled={isApplying}>
                {isApplying ? 'Applying...' : 'Apply Now'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
