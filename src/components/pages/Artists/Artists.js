import './Artists.css';
import Searcher from '../Searcher/Searcher';
import { useContext } from 'react';
import { ApiContext } from '../../../services/Api';

const Artists = () => {
  const { apiResponse, search } = useContext(ApiContext);
  //console.log(apiResponse); 

  //prueba para filtrar los artistas
  const filteredArtists = apiResponse?.artists?.items?.filter((artist) => artist.name.toLowerCase().includes(search.toLowerCase()));
  //console.log(filteredArtists);
  
  if (apiResponse && apiResponse.artists && apiResponse.artists.items) {
    return (
      <div className='artists'>
        <h1>Lista de artistas</h1>
        <Searcher />
        <div className='artists-div'>
          {filteredArtists?.map((artist) => {
            return (
              <div key={artist.id} className='artist.card'>
                <h2>{artist.name}</h2>
                {artist.images && artist.images.length > 0 && (<img src={artist.images[ 0 ].url} alt={artist.name} className='artist-img' />)}
                {/* <img src={artist.images[ 0 ].url} alt={artist.name} className='artist-img' /> */}
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