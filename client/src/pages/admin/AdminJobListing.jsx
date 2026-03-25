import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { getMyJobs, deleteJob } from '../../features/jobs/jobsSlice';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';

const AdminJobListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myJobs, isLoading } = useSelector((state) => state.jobs);
  const [deleteModal, setDeleteModal] = useState(null);

  useEffect(() => { dispatch(getMyJobs()); }, [dispatch]);

  const handleEdit = (jobId) => navigate(`/admin/jobs/new?edit=${jobId}`);

  const handleDelete = async () => {
    if (!deleteModal) return;
    try {
      await dispatch(deleteJob(deleteModal)).unwrap();
      toast.success('Job deleted successfully!');
    } catch (error) {
      toast.error(error || 'Failed to delete');
    }
    setDeleteModal(null);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1>My Posted Jobs</h1>
        <Link to="/admin/jobs/new" className="btn btn-primary">+ Post New Job</Link>
      </div>

      {myJobs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">/* Icon Placeholder */</div>
          <h3>No jobs posted yet</h3>
          <p>Click "Post New Job" to create your first listing</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Type</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myJobs.map((job) => (
                <tr key={job._id}>
                  <td style={{ fontWeight: 600 }}>{job.companyName}</td>
                  <td>{job.position}</td>
                  <td>
                    <span className={`job-card-badge ${job.type === 'Full Time' ? 'badge-fulltime' : 'badge-parttime'}`}>
                      {job.type}
                    </span>
                  </td>
                  <td>{job.location}</td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-outline btn-sm" onClick={() => handleEdit(job._id)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => setDeleteModal(job._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="modal-overlay" onClick={() => setDeleteModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button className="modal-close" onClick={() => setDeleteModal(null)}>×</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this job listing? This action cannot be undone.</p>
              <div className="modal-actions">
                <button className="btn btn-ghost" onClick={() => setDeleteModal(null)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete Job</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminJobListing;
