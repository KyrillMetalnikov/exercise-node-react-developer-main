import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Repo } from '../../../api/src/models/Repo';
import { getRepo, sortByDateReverse } from '../utils/utils';
import { AxiosResponse } from 'axios';

export interface RepoState {
  repos: Repo[];
}

const initialState: RepoState = {
  repos: [],
};

export const getReposAsync = createAsyncThunk('repo/getRepos', async () => {
  let finished = false;
  let response = {} as AxiosResponse;
  while (!finished) {
    try {
      response = await getRepo();
      if (response.status === 200) {
        finished = true;
      }
    } catch {
      console.log('Retrying Get Request');
    }
  }
  response.data.sort(function (a: Repo, b: Repo) {
    return sortByDateReverse(b, a);
  });
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
