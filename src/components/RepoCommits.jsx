import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import CommitDetails from './CommitDetails';

export const RepoCommits = ({name, commits, resetCommits}) => {

    return (
        <div>
            <h1>Commits del repositorio {name}</h1>
            {commits.length > 0 ?
            (commits.map(commit => (
                <div key={commit.sha}>
                    <a className="commit" href={commit.html_url} target="_blank">- {commit.commit.message}<CommitDetails commitUrl={commit.url} /></a>
                </div>)
            ))
            :
            (<p>El repositorio no tiene commits</p>)}
            <Button variant="contained" onClick={resetCommits} style={{marginTop: '15px'}}>Volver a repositorios</Button>
        </div>
    )
}

export default RepoCommits;