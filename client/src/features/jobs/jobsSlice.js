import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchAllJobs,
  fetchMyJobs,
  createNewJob,
  updateExistingJob,
  deleteExistingJob,
} from './jobsAPI';

const initialState = {
  jobs: [],
  myJobs: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Get all jobs (public)
export const getJobs = createAsyncThunk('jobs/getAll', async (_, thunkAPI) => {
  try {
    return await fetchAllJobs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Get admin's own jobs
export const getMyJobs = createAsyncThunk('jobs/getMine', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await fetchMyJobs(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Create job (admin)
export const createJob = createAsyncThunk('jobs/create', async (jobData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await createNewJob(jobData, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Update job (admin)
export const updateJob = createAsyncThunk('jobs/update', async ({ id, jobData }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await updateExistingJob(id, jobData, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Delete job (admin)
export const deleteJob = createAsyncThunk('jobs/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    await deleteExistingJob(id, token);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    resetJobsState: (state) => {
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all jobs
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get my jobs
      .addCase(getMyJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myJobs = action.payload;
      })
      .addCase(getMyJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create job
      .addCase(createJob.fulfilled, (state, action) => {
        state.myJobs.unshift(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      // Update job
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.myJobs.findIndex((j) => j._id === action.payload._id);
        if (index !== -1) state.myJobs[index] = action.payload;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      // Delete job
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.myJobs = state.myJobs.filter((j) => j._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetJobsState } = jobsSlice.actions;
export default jobsSlice.reducer;
