import './Searcher.css';
import React, { useContext, useState } from 'react';
import { ApiContext } from '../../../services/Api';

const Searcher = ({ setFilteredArtists, setSearch }) => {
    const { apiResponse } = useContext(ApiContext);
    const [ searchValue, setSearchValue ] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    const handleClick = () => {
        setFilteredArtists(searchValue);
    };

    return (
        <div className='searcher'>
            <h1>BUSCA TU ARTISTA PREFERIDO</h1>

            <input
                className='searcher-input'
                type='text'
                onChange={handleChange}
                value={searchValue}
            />

            <button onClick={handleClick}>buscar</button>
        </div>
    );
};

export default Searcher;