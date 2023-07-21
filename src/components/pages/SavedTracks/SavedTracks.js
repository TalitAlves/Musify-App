import './SavedTracks.css';
import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { ApiContext } from '../../../services/Api';
import { Link } from 'react-router-dom';

const SavedTracks = () => {
  const [ savedTracks, setSavedTracks ] = useState([]);
  const [ visibleTracks, setVisibleTracks ] = useState(5);
  const [ totalSavedTracks, setTotalSavedTracks ] = useState(0);
  const { access_token } = useContext(ApiContext)

  useEffect(() => {
    const fetchSavedTracks = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/tracks', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + access_token,
          },
        });
        const data = await response.json();

        setSavedTracks(data.items);
        // como las canciones pueden variar si agregamos o no más canciones hay que guardarlas
        setTotalSavedTracks(data.total);
        console.log("respuesta Saved tracks", data.items);
      } catch (error) {
        console.log("petición favoritos fallida", error);
      }
    };
    fetchSavedTracks();
  }, [ access_token ]);

  const handleShowMore = () => {
    setVisibleTracks(totalSavedTracks);
  };

  const handleShowLess = () => {
    setVisibleTracks(5);
  };

  return (
    <div>
      <h1 className='savedtracks-title'>
        Saved Tracks <AiOutlineHeart className='icon-heart' />
      </h1>
      <div className='btn-saved-div'>
        {visibleTracks < totalSavedTracks && (
          <button onClick={handleShowMore}>
            Mostrar más <IoMdArrowDropdown />
          </button>
        )}

        {visibleTracks > 5 && (
          <button onClick={handleShowLess}>
            Mostrar menos <IoMdArrowDropup />
          </button>
        )}
      </div>

      <div className='saved-tracks-container'>
        {savedTracks?.slice(0, visibleTracks).map((track) => (
          <div className='saved-track-card' key={track.track.id}>
            <h3 className='saved-trackname'>{track.track.name}</h3>
            <Link to={`/track/${track.track.id}`}>
              <img
                className='saved-track-img'
                src={track.track.album.images[ 0 ].url}
                alt={track.track.name}
              />
            </Link>
            <h4>{track.track.artists[ 0 ].name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedTracks;