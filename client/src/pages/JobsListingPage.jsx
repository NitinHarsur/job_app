import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getJobs } from '../features/jobs/jobsSlice';
import { applyToJob, getApplications } from '../features/applications/applicationsSlice';
import JobCard from '../components/JobCard';
import toast from 'react-hot-toast';

const JobsListingPage = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading } = useSelector((state) => state.jobs);
  const { appliedJobIds, isLoading: isApplying } = useSelector((state) => state.applications);
  const { user } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [applyingJobId, setApplyingJobId] = useState(null);

  useEffect(() => {
    dispatch(getJobs());
    if (user) dispatch(getApplications());
  }, [dispatch, user]);

  const locations = useMemo(() => {
    return [...new Set(jobs.map((j) => j.location))].sort();
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch = job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchLoc = !locationFilter || job.location === locationFilter;
      const matchType = !typeFilter || job.type === typeFilter;
      return matchSearch && matchLoc && matchType;
    });
  }, [jobs, searchTerm, locationFilter, typeFilter]);

  const handleApply = async (jobId) => {
    setApplyingJobId(jobId);
    try {
      await dispatch(applyToJob(jobId)).unwrap();
      toast.success('Applied successfully!');
    } catch (error) {
      toast.error(error || 'Failed to apply');
    }
    setApplyingJobId(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setTypeFilter('');
  };

  const hasFilters = searchTerm || locationFilter || typeFilter;

  return (
    <div className="page-container fade-in">
      {/* Welcome Banner */}
      {user && (
        <div className="welcome-banner">
          <h2>Welcome back, {user.name}</h2>
          <p>Browse and apply to the latest opportunities</p>
        </div>
      )}

      {/* Filter Bar */}
      <div className="filter-bar">
        <input type="text" className="form-input" placeholder="Search by company name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select className="form-select" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          <option value="">All Locations</option>
          {locations.map((loc) => (<option key={loc} value={loc}>{loc}</option>))}
        </select>
        <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
        </select>
        {hasFilters && (
          <button className="btn btn-ghost btn-sm" onClick={clearFilters}>✕ Clear Filters</button>
        )}
      </div>

      <div className="page-header">
        <h1>Browse Jobs</h1>
        <span style={{ color: '#64748B', fontSize: '.9rem' }}>
          {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Job Cards */}
      {isLoading ? (
        <div className="jobs-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton skeleton-card"></div>
          ))}
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">/* Icon Placeholder */</div>
          <h3>No jobs found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onApply={user ? handleApply : null}
              isApplied={appliedJobIds.includes(job._id)}
              isApplying={applyingJobId === job._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsListingPage;
