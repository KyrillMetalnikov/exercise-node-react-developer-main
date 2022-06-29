import axios from 'axios';
import { Repo } from '../../../api/src/models/Repo';

export async function getRepo() {
  const URL = 'http://localhost:4000/repos';

  return axios.get<Repo[]>(URL);
}
