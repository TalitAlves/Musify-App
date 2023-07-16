import { ApiContext } from '../../../services/Api';
import React, { useContext, useEffect, useState } from 'react';
import Searcher from '../Searcher/Searcher';
import './Artists.css';

const Artists = () => {
  const { apiResponse } = useContext(ApiContext);
  const [ filteredArtists, setFilteredArtists ] = useState([]);
  const [ search, setSearch ] = useState('');

  useEffect(() => {
    if (apiResponse && apiResponse.artists && apiResponse.artists.items) {
      const artistListArray = apiResponse.artists.items;
      const filtered = artistListArray.filter((artist) =>
        artist.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredArtists(filtered);
    }
  }, [ apiResponse, search ]);

  const artistListArray = apiResponse && apiResponse.artists && apiResponse.artists.items;

  const filtered = artistListArray.filter((artist) =>
    artist.name.toLowerCase().includes(search.toLowerCase())
  );
  setFilteredArtists(filtered);


  return (
    <div className='artists'>
      <h1>Lista de artistas</h1>
      <Searcher setFilteredArtists={setFilteredArtists} setSearch={setSearch} />
      <div className='artists-div'>
        {filteredArtists.map((artist) => {
          return (
            <div key={artist.id} className='artist-card'>
              <h3>{artist.name}</h3>
              <img src={artist.images[ 0 ].url} alt={artist.name} className='artist-img' />
              {/* hay algunos artistas que no tienen genero y devuelve undefined */}
              {artist.genres && artist.genres.length > 0 && (
                <p>Géneros: {artist.genres.join(', ')}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Artists;