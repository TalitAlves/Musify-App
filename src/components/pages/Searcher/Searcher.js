import './Searcher.css';
import { useState } from 'react';

const Searcher = ({artists}) => {

    //es para quedarnos con el array de objetos que se llama items (está adentro del objeto artist que devuelve la api)
    const artist = artists.artists.items;
    console.log(artist);

/*     
    const artistData = artist.map((eachElement) => {
        const { genres, images, id, name } = eachElement;
        return { genres, images, id, name };
    });

    console.log(artistData); */

    //variable de estado para guardar los datos de busqueda que introduce el usuario
    const [ artistSearch, setArtistSearch ] = useState('');

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