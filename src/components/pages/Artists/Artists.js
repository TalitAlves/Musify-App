import './Artists.css';
import Searcher from '../Searcher/Searcher';
import { useContext } from 'react';
import { ApiContext } from '../../../services/Api';

const Artists = () => {
  const { apiResponse } = useContext(ApiContext);
  //console.log(apiResponse); 

  if (apiResponse && apiResponse.artists && apiResponse.artists.items) {
    return (
      <div className='artists'>
        <h1>Lista de artistas</h1>
        <Searcher />
        <div className='artists-div'>
          {apiResponse.artists?.items?.map((artist) => {
            return (
              <div key={artist.id} className='artist.card'>
                <h2>{artist.name}</h2>
                <img src={artist.images[ 0 ].url} alt={artist.name} className='artist-img' />
                {artist.genres && (<p>{artist.genres.join(', ')}</p>)}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default Artists;