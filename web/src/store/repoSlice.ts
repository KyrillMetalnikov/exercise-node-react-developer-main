import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Repo } from '../../../api/src/models/Repo';
import { getRepo } from '../utils/utils';

export interface RepoState {
  repos: Repo[];
}

const initialState: RepoState = {
  repos: [],
};

export const getReposAsync = createAsyncThunk('repo/getRepos', async () => {
  const response = await getRepo();
  console.log(response.status);
  return response.data;
});

export const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    update: (state, action) => {
      state.repos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReposAsync.fulfilled, (state, action) => {
      state.repos = action.payload;
    });
  },
});

export const { update } = repoSlice.actions;
export const selectRepos = (state: RootState) => state.repos.repos;
export default repoSlice.reducer;
