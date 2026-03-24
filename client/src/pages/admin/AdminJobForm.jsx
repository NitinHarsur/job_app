import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createJob, updateJob, getMyJobs } from '../../features/jobs/jobsSlice';
import toast from 'react-hot-toast';

const AdminJobForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const { myJobs } = useSelector((state) => state.jobs);

  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    type: 'Full Time',
    location: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing job data if editing
  useEffect(() => {
    if (editId) {
      // Ensure myJobs are loaded
      if (myJobs.length === 0) {
        dispatch(getMyJobs());
        return;
      }

      const existingJob = myJobs.find((j) => j._id === editId);
      if (existingJob) {
        setFormData({
          companyName: existingJob.companyName,
          position: existingJob.position,
          type: existingJob.type,
          location: existingJob.location,
        });
      }
    }
  }, [editId, myJobs, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.companyName || !formData.position || !formData.type || !formData.location) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editId) {
        await dispatch(updateJob({ id: editId, jobData: formData })).unwrap();
        toast.success('Job updated successfully!');
      } else {
        await dispatch(createJob(formData)).unwrap();
        toast.success('Job posted successfully!');
      }
      navigate('/admin/jobs');
    } catch (error) {
      toast.error(error || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>{editId ? 'Edit Job' : 'Post New Job'}</h1>
      </div>

      <div className="card" style={{ maxWidth: '600px' }}>
        <div className="card-body" style={{ padding: 'var(--space-xl)' }}>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}
            onSubmit={handleSubmit}
          >
            <div className="input-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                id="companyName"
                type="text"
                name="companyName"
                className="form-input"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="position">Position</label>
              <input
                id="position"
                type="text"
                name="position"
                className="form-input"
                placeholder="Enter position title"
                value={formData.position}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                name="location"
                className="form-input"
                placeholder="Enter job location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-sm)' }}>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
                style={{ flex: 1 }}
              >
                {isSubmitting
                  ? editId ? 'Updating...' : 'Posting...'
                  : editId ? 'Update Job' : 'Post Job'}
              </button>
              <button
                type="button"
                className="btn btn-outline btn-lg"
                onClick={() => navigate('/admin/jobs')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminJobForm;
