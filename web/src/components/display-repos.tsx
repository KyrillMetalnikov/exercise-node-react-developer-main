import React, { useState } from 'react';
import { Repo } from '../../../api/src/models/Repo';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getReposAsync, selectRepos } from '../store/repoSlice';
import { findAllLanguages } from '../utils/utils';
import { DisplaySingleRepo } from './display-single-repo';

export function DisplayRepos() {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getReposAsync());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const repos = useAppSelector(selectRepos);
  const [currentRepos, setCurrentRepos] = useState(repos);
  const languages = findAllLanguages(repos);

  // Displays the repos in the language on the button
  function filterLanguage(language: any) {
    const result = [];
    console.log(language);
    for (let i = 0; i < repos.length; i++) {
      if (repos[i].language === language) {
        result.push(repos[i]);
      }
    }

    setCurrentRepos(result);
  }

  return (
    <div>
      <ul>
        {currentRepos.map((repo: Repo) => (
          <div key={repo.id}>
            <DisplaySingleRepo {...repo} />
          </div>
        ))}
      </ul>
      <div>
        {languages.map((language: any) => (
          <div key={language}>
            <button onClick={() => filterLanguage(language)} value={language}>
              {language}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
