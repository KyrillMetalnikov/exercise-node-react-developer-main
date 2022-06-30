import axios from 'axios';
import { Repo } from '../../../api/src/models/Repo';

export async function getRepo() {
  const URL = 'http://localhost:4000/repos';

  return axios.get<Repo[]>(URL);
}

export function sortByDateReverse(a: Repo, b: Repo) {
  const firstDate = new Date(a.created_at);
  const secondDate = new Date(b.created_at);

  return firstDate.getTime() - secondDate.getTime();
}

export function findAllLanguages(repos: Repo[]) {
  const uniqueLanguages = new Set<string>();
  for (let i = 0; i < repos.length; i++) {
    uniqueLanguages.add(repos[i].language);
  }

  return Array.from(uniqueLanguages);
}
