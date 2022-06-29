import './App.css';
import { DisplayRepos } from './components/display-repos';

export function App() {
  return (
    <div className="App">
      <h1>List of all Repos</h1>
      <DisplayRepos />
    </div>
  );
}
