import React, { useState } from 'react';
import { Repo } from '../../../api/src/models/Repo';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getReposAsync, selectRepos } from '../store/repoSlice';
import { findAllLanguages, isEmptyObject } from '../utils/utils';
import { DisplayRepoDetails } from './display-repo-details';
import { DisplaySingleRepo } from './display-single-repo';

export function DisplayRepos() {
  const dispatch = useAppDispatch();
  const repos = useAppSelector(selectRepos);
  const languages = findAllLanguages(repos);
  const [selectedRepo, setSelectedRepo] = useState({} as Repo);
  const [currentRepos, setCurrentRepos] = useState(repos);

  React.useEffect(() => {
    dispatch(getReposAsync());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // I'm aware this is terrible but all I could do during the day
  setTimeout(() => setCurrentRepos(repos), 1000);

  // Displays the repos in the language on the button
  function filterLanguage(language: any) {
    const result = [];
    for (let i = 0; i < repos.length; i++) {
      if (repos[i].language === language) {
        result.push(repos[i]);
      }
    }

    setCurrentRepos(result);
  }

  function handleClick(repo: Repo) {
    setSelectedRepo(repo);
  }

  return (
    <div>
      {isEmptyObject(selectedRepo) && (
        <>
          <div>
            {languages.map((language: any) => (
              <div key={language}>
                <button onClick={() => filterLanguage(language)}>
                  {language}
                </button>
              </div>
            ))}
          </div>
          <ul>
            {currentRepos.map((repo: Repo) => (
              <div key={repo.id} onClick={() => handleClick(repo)}>
                <DisplaySingleRepo {...repo} />
              </div>
            ))}
          </ul>
        </>
      )}
      {!isEmptyObject(selectedRepo) && (
        <>
          <DisplayRepoDetails {...selectedRepo} />
          <button onClick={() => setSelectedRepo({} as Repo)}>Back</button>
        </>
      )}
    </div>
  );
}
