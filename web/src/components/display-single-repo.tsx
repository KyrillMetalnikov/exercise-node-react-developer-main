import { Repo } from '../../../api/src/models/Repo';

export function DisplaySingleRepo(repo: Repo) {
  console.log(repo);
  return (
    <ul>
      <li>{repo.name}</li>
      <li>{repo.description}</li>
      <li>{repo.language}</li>
      <li>{repo.forks_count}</li>
    </ul>
  );
}
