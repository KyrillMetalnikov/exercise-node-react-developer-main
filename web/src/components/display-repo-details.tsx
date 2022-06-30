import axios from 'axios';
import { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Repo } from '../../../api/src/models/Repo';

export function DisplayRepoDetails(currentRepo: Repo) {
  const [readmeExists, toggleReadmeExists] = useState(false);
  const [markDown, setMarkDown] = useState('');

  axios
    .get(
      `https://raw.githubusercontent.com/${currentRepo.full_name}/master/README.md`
    )
    .then((res) => {
      if (res.status !== 404) {
        setMarkDown(res.data);
        toggleReadmeExists(true);
      }
    });

  return (
    <ul>
      <li>Most recent commit: {currentRepo.updated_at}</li>
      <li>Author: Can't get SHA yet</li>
      <li>Message: Can't get SHA yet</li>
      {readmeExists && <ReactMarkdown>{markDown}</ReactMarkdown>}
    </ul>
  );
}
