import { Repo } from '../../../api/src/models/Repo';

export function DisplayRepoDetails(repo: Repo) {
  return (
    <ul>
      <li>Name: {repo.name}</li>
      <li>Description: {repo.description}</li>
      <li>Language: {repo.language}</li>
      <li>Fork Count: {repo.forks_count}</li>
    </ul>
  );
}