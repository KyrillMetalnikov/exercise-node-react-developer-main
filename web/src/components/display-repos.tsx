import React from 'react';
import { Repo } from '../../../api/src/models/Repo';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getReposAsync, selectRepos } from '../store/repoSlice';
import { DisplaySingleRepo } from './display-single-repo';

export function DisplayRepos() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getReposAsync());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const repos: Repo[] = useAppSelector(selectRepos);

  return (
    <div>
      <ul>
        {repos.map((repo: Repo) => (
          <div key={repo.id}>
            <DisplaySingleRepo {...repo} />
          </div>
        ))}
      </ul>
    </div>
  );
}
