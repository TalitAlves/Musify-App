import './Searcher.css';
import { useState } from 'react';

const Searcher = ({artists}) => {

    //variable de estado para guardar los datos de busqueda que introduce el usuario
    const [ artistSearch, setArtistSearch ] = useState('');

    //función para cambiar el valor del input según lo que escribe el usuario
    const handleChange = (event) => {
        const value = event.target.value;
        setArtistSearch(value);
        console.log(value);
    }

    const handleClick = () => {
        console.log("botón funcionando");
    }

    return (
        <div className='searcher'>
            <h1>BUSCA TU ARTISTA PREFERIDO</h1>

            <input 
            className='searcher-input' 
            type='text' 
            value={artistSearch} 
            onChange={handleChange} />

            <button onClick={handleClick}>buscar</button>
        </div>
    )
}

export default Searcher;