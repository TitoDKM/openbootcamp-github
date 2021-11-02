import './App.css';
import React, { useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import ReposPage from './components/ReposPage';

const UserTextField = styled(TextField)({
  '& input + fieldset': {
    borderColor: '#1976d2'
  },
  '& input:valid:focus + fieldset': {
    borderColor: '#1976d2'
  },
  '& input:valid + fieldset': {
    borderColor: '#1976d2'
  },
  '& input:invalid + fieldset': {
    borderColor: 'red'
  },
  '& input': {
    color: 'white',
    fontFamily: 'Raleway, sans-serif',
    borderWidth: 4
  },
  '& .MuiInputLabel-root': {
    color: 'white'
  }
});

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [usingUser, setUsingUser] = useState('');

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  }

  const trySearch = (e) => {
    e.preventDefault();
    if(searchValue.length <= 0) {
      alert('Debes introducir un usuario para buscar');
      return;
    }
    setUsingUser(searchValue);
    setSearchValue('');
  }

  const resetSearch = () => {
    setUsingUser('');
  }

  return (
    <div className="App">
      {!usingUser && (
        <form className="search-form" onSubmit={trySearch}>
          <h1>Introduce un usuario para obtener sus repositorios</h1>
          <div className="form-input">
            <UserTextField label="Usuario a buscar" variant="outlined" value={searchValue} onChange={handleChange} />
          </div>
          <div className="form-button">
            <Button variant="contained" onClick={trySearch}>Buscar usuario</Button>
          </div>
        </form>
      )}
      {usingUser &&(<ReposPage user={usingUser} reset={resetSearch} />)}
    </div>
  );
}

export default App;
