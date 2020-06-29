import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      title: "My New Repo Title",
      url: "git@github.com:pedroinc/my-new-repo-url.git",
      techs: ["node", "react", "react native"]	
    })

    const justAddedRepo = response.data;
    setRepositories([...repositories, justAddedRepo]);
  }

  async function handleRemoveRepository(id) {
    const reponse = await api.delete(`/repositories/${id}`);

    if(reponse.status === 204) {
      setRepositories([...repositories.filter(item => item.id !== id)]);
    }
  }

  return (
    <div>

      <h3>My Repositories</h3>

      <ul data-testid="repository-list">
        {repositories.map(repo => <li key={repo.id}>{repo.title}<button onClick={() => handleRemoveRepository(repo.id)}>Remover</button></li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
