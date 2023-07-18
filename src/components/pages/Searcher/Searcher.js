import { useContext, useState } from 'react';
import { ApiContext } from '../../../services/Api';
import './Searcher.css';

const Searcher = () => {
    const { setSearch } = useContext(ApiContext);
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (ev) => {
        setSearchTerm(ev.target.value);
    }

    const handleClick = () => {
        setSearch(searchTerm);
    }

    return (
        <div className='searcher'>
            <h1>BUSCA TU ARTISTA PREFERIDO</h1>

            <input
                className='searcher-input'
                type='text'
                value={searchTerm}
                onChange={handleInputChange}
            />

            <button onClick={handleClick}>buscar</button>
        </div>
    );
};

export default Searcher;