import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getJobs } from '../features/jobs/jobsSlice';
import { applyToJob, getApplications } from '../features/applications/applicationsSlice';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';

const JobsListingPage = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading } = useSelector((state) => state.jobs);
  const { appliedJobIds, isLoading: isApplying } = useSelector((state) => state.applications);
  const { user } = useSelector((state) => state.auth);

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    dispatch(getJobs());
    if (user) {
      dispatch(getApplications());
    }
  }, [dispatch, user]);

  // Get unique locations for dropdown
  const locations = useMemo(() => {
    const locs = [...new Set(jobs.map((job) => job.location))];
    return locs.sort();
  }, [jobs]);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesLocation = !locationFilter || job.location === locationFilter;
      const matchesType = !typeFilter || job.type === typeFilter;
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, searchTerm, locationFilter, typeFilter]);

  const handleApply = async (jobId) => {
    try {
      await dispatch(applyToJob(jobId)).unwrap();
      toast.success('Successfully applied to job!');
    } catch (error) {
      toast.error(error || 'Failed to apply');
    }
  };

  const [applyingJobId, setApplyingJobId] = useState(null);

  const handleApplyWithState = async (jobId) => {
    setApplyingJobId(jobId);
    await handleApply(jobId);
    setApplyingJobId(null);
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>Browse Jobs</h1>
        <span style={{ color: '#64748B', fontSize: '0.9rem' }}>
          {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Search & Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          className="form-input"
          placeholder="🔍 Search by company name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="form-select"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option value="">📍 All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <select
          className="form-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">🏷️ All Types</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
        </select>
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
          <div className="empty-state-icon">💼</div>
          <h3>No jobs found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onApply={user ? handleApplyWithState : null}
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
