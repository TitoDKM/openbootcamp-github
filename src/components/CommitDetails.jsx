import React, { useState, useEffect } from 'react';

const fetchAuthArgs = {
}

const CommitDetails = ({commitUrl}) => {
    const [commitInfo, setCommitInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [fileCounts, setFileCounts] = useState({});

    useEffect(() => {
        (async() => {
            const response = await fetch(commitUrl, fetchAuthArgs);
            const result = await response.json();
            if(result.message) {
                alert('Error al cargar la información del commit: ' + result.message);
            } else {
                setCommitInfo(result);
                setLoading(false);
                handleFileCount(result.files);
            }
        })();
    }, []);

    const handleFileCount = (files) => {
        let newFilesCount = {};
        for(let file in files) {
            file = files[file];
            const fileName = file.filename.split('/')[file.filename.split('/').length - 1];
            let fileExtension = fileName.includes('.') ? "." + fileName.split('.')[fileName.split('.').length - 1] : fileName;
            if(newFilesCount[fileExtension])
                newFilesCount[fileExtension] += 1;
            else
                newFilesCount[fileExtension] = 1;
        }
        setFileCounts(newFilesCount);
    }

    if(loading)
        return (<p>Cargando datos del commit...</p>)

    if(!commitInfo || (commitInfo && Object.keys(commitInfo).length === 0))
        return (<p>No se han podido cargar los datos del commit</p>)

    return (
        <div>
            {Object.keys(fileCounts).map(index => <p className="commitInfo">{index}: {fileCounts[index]}</p>)}
            {/*Object.keys(commitInfo.files).map(file => <p className="commitInfo">{commitInfo.files[file].filename}</p>)*/}
        </div>
    )
}

export default CommitDetails;