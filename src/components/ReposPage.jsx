import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import RepoCommits from './RepoCommits';

const fetchAuthArgs = {
}

const ReposPage = ({user, reset}) => {
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentRepo, setCurrentRepo] = useState('');
    const [commits, setCommits] = useState([]);

    useEffect(() => {
        (async() => {
            const response = await fetch('https://api.github.com/users/' + user + '/repos', fetchAuthArgs);
            const result = await response.json();
            if(result.message) {
                setError(result.message);
            } else {
                setRepos(result);
            }
            setLoading(false);
        })();
    }, []);

    const handleCommitClick = async(e) => {
        const repoName = e.target.attributes.name.value;
        setCurrentRepo(repoName);
        const response = await fetch('https://api.github.com/repos/' + user + '/' + repoName +'/commits', fetchAuthArgs);
        const result = await response.json();
        if(result.message) {
            setError(result.message);
        } else {
            setCommits(result);
        }
    }

    const resetCommits = () => {
        setError('');
        setCurrentRepo('');
        setCommits([]);
    }

    if(loading)
        return (<h1>Cargando repositorios de {user}...</h1>);
    if(error)
        return(
            <div>
                <h1>Repositorios de {user}</h1>
                <p style={{fontSize: '15px', fontWeight: 'bold'}}>Error: <i>{error}</i></p>
                <div><Button variant="contained" onClick={resetCommits}>Lista de repositorios</Button></div>
                <div><Button variant="contained" onClick={reset} style={{marginTop: '10px'}}>Volver a buscar</Button></div>
            </div>
        )
    if(commits.length > 0)
        return (<RepoCommits resetCommits={resetCommits} name={currentRepo} commits={commits} />);

    return (
        <div>
            <h1>Repositorios de {user}</h1>
            {repos.length > 0 ? 
            (<div>{repos.map(repo => <div className="repo" key={repo.id} onClick={handleCommitClick} name={repo.name}>- {repo.name}</div>)}<p style={{fontSize: '15px', fontStyle: 'italic', marginTop: '25px'}}>Pulsa un repositorio para ver sus commits</p></div>)
            :
            (<p>El usuario no tiene repositorios</p>)}
            <Button variant="contained" onClick={reset}>Volver a buscar</Button>
        </div>
    )
}

export default ReposPage;