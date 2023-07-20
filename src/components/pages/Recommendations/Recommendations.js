import React from 'react'
import './Recommendations.css';
import { useContext } from 'react';
import { ApiContext } from '../../../services/Api';

const Recommendations = () => {
  const { recApiResponse } = useContext(ApiContext);
  const { seeds, tracks } = recApiResponse;
  //console.log("SEEDS", seeds);
  //console.log("TRACKS", tracks);

  if (!recApiResponse) {
    return <div>Loading...</div>;
  }

  if (recApiResponse && recApiResponse.tracks && recApiResponse.seeds) {
    return (
      <div className='recommendations'>
        <h1 className='recommendations-title'>
          Specially For You</h1>

        <div className='rec-tracks-container'>
          <div className='rec-tracks-card'>
            {tracks.map((track) => (
              <div key={track.id}>
                <h3>{track.name}</h3>
                <img src={track.album.images[ 0 ].url} alt={track.name} />
                <h4>nombre artista</h4>
              </div>
            ))}
          </div>

        </div>

      </div>
    )
  }




}

export default Recommendations;