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
            <div className='track-card' key={track.id}>

              {track.artists && track.artists.length > 0 && (
                <h3>{track.artists[ 0 ].name}</h3>
              )}

              {track.album && track.album.images && track.album.images.length > 0 && (
                <img className='track-album-image' src={track.album.images[ 0 ].url} alt={track.album.name} />
              )}

              {track.name && <p>{track.name}</p>}

            </div>
            
          ))}
        </div>

        <div className='tracks-container'>
          {trackApiResponse.tracks.items.map((track) => (
            <div className='track-card' key={track.id}>

              {track.artists && track.artists.length > 0 && (
                <h3>{track.artists[ 0 ].name}</h3>
              )}

              {track.album && track.album.images && track.album.images.length > 0 && (
                <img className='track-album-image' src={track.album.images[ 0 ].url} alt={track.album.name} />
              )}

              {track.name && <p>{track.name}</p>}

            </div>
            
          ))}
        </div>

        <div className='tracks-container'>
          {trackApiResponse.tracks.items.map((track) => (
            <div className='track-card' key={track.id}>

              {track.artists && track.artists.length > 0 && (
                <h3>{track.artists[ 0 ].name}</h3>
              )}

              {track.album && track.album.images && track.album.images.length > 0 && (
                <img className='track-album-image' src={track.album.images[ 0 ].url} alt={track.album.name} />
              )}

              {track.name && <p>{track.name}</p>}

            </div>
            
          ))}
        </div>

      </div>
    );
  }

  return null;
}

export default Home;