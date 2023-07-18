import './Home.css';
import { useContext } from 'react';
import { ApiContext } from '../../../services/Api';

const Home = () => {
  const { trackApiResponse } = useContext(ApiContext);
  //  console.log(trackApiResponse);

  if (trackApiResponse && trackApiResponse.tracks && trackApiResponse.tracks.items) {
    return (
      <div className='home'>
        <h1 className='home-title'>BIENVENIDO A LA HOME</h1>

        <div className='tracks-container'>
          {trackApiResponse.tracks.items.map((track) => (
            <div className='track-album-div' key={track.id}>
            
              {track.name && <p>{track.name}</p>}
              
              {track.album && track.album.images && track.album.images.length > 0 && (
                <img className='track-album-image' src={track.album.images[0].url} alt={track.album.name} />
              )}

              {track.artists && track.artists.length > 0 && (
                <p>{track.artists[0].name}</p>
              )}
            </div>
          ))}
        </div>

      </div>
    );
  }

  return null;
}

export default Home;