import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

export const RepoCommits = ({name, commits, resetCommits}) => {

    console.log(commits);

    return (
        <div>
            <h1>Commits del repositorio {name}</h1>
            {commits.length > 0 ?
            (commits.map(commit => (<div><a key={commit.sha} className="commit" href={commit.html_url} target="_blank">- {commit.commit.message}</a></div>)))
            :
            (<p>El repositorio no tiene commits</p>)}
            <Button variant="contained" onClick={resetCommits} style={{marginTop: '15px'}}>Volver a repositorios</Button>
        </div>
    )
}

export default RepoCommits;