import './Home.css';
import React, { useState } from 'react';
import { useContext } from 'react';
import { ApiContext } from '../../../services/Api';
import { Link } from 'react-router-dom';
import SavedTracks from '../SavedTracks/SavedTracks';

const Home = () => {
  const { trackApiResponse } = useContext(ApiContext);
  const [ visibleTracks, setVisibleTracks ] = useState(5);

  // si recibo respuesta de la API entonces renderízame esto
  if (trackApiResponse && trackApiResponse.tracks && trackApiResponse.tracks.items) {
    const allTracks = trackApiResponse.tracks.items;

    const handleShowMore = () => {
      setVisibleTracks(allTracks.length);
    };

    const handleShowLess = () => {
      setVisibleTracks(5);
    };

    return (
      <div className='home'>
        <h1 className='home-title'>BIENVENIDO A LA HOME</h1>

        <div className='tracks-container'>

          {/* botón mostrar más o menos */}
          {visibleTracks < allTracks.length && (
            <button onClick={handleShowMore}>más</button>
          )}

          {visibleTracks > 5 && (
            <button onClick={handleShowLess}>mostrar menos</button>
          )}

          {allTracks.slice(0, visibleTracks).map((track) => (
            <div className='track-card' key={track.id}>

              {track.artists && track.artists.length > 0 && (
                <h3>{track.artists[ 0 ].name}</h3>
              )}

              {track.album && track.album.images && track.album.images.length > 0 && (
                <Link to={`/track/${track.id}`}>
                  <img
                    className='track-album-image'
                    src={track.album.images[ 0 ].url}
                    alt={track.album.name}
                  />
                </Link>
              )}

              {track.name && <p>{track.name}</p>}

            </div>
          ))}
        </div>

        <SavedTracks />
      </div>
    );
  }

  return null;
}

export default Home;