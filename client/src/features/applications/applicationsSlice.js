import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { applyForJob, fetchApplications } from './applicationsAPI';

const initialState = {
  applications: [],
  appliedJobIds: [],
  isLoading: false,
  isError: false,
  message: '',
};

// Apply to a job
export const applyToJob = createAsyncThunk('applications/apply', async (jobId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await applyForJob(jobId, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Get user's applications
export const getApplications = createAsyncThunk('applications/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    return await fetchApplications(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    resetApplicationsState: (state) => {
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Apply to job
      .addCase(applyToJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications.unshift(action.payload);
        state.appliedJobIds.push(action.payload.job?._id || action.payload.job);
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get applications
      .addCase(getApplications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = action.payload;
        state.appliedJobIds = action.payload.map((app) => app.job?._id || app.job);
      })
      .addCase(getApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetApplicationsState } = applicationsSlice.actions;
export default applicationsSlice.reducer;
