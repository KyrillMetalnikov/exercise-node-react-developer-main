import { Router, Request, Response } from 'express';
import { Repo } from '../models/Repo';
import reposFileData from '../../data/repos.json'
const XMLHttpRequest = require('xhr2');

export const repos = Router();

const repoURL = "https://api.github.com/users/silverorange/repos";

// Gets the repo data from the provided url
const fetchRepoData = () => new Promise<Array<Repo>>(resolve => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', repoURL);
  xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
  };
  xhr.send();
});

// Filters the repos to only keep repos where repository.fork === false
function filterRepo(repository: Array<Repo>) {
  let result = [];
  for (let i = 0; i < repository.length; i++) {
    if (repository[i].fork === false) {
      result.push(repository[i]);
    }
  }

  return result;
}

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  fetchRepoData().then((response: Array<Repo>) => {
    let jsonResponse = filterRepo(response);
    jsonResponse = jsonResponse.concat(filterRepo(reposFileData));

    res.status(200);
    res.json(jsonResponse);
  })
});
