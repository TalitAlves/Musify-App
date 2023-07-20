import React from 'react'
import './Recommendations.css';
import { useContext } from 'react';
import { ApiContext } from '../../../services/Api';
import { BeatLoader } from 'react-spinners';

const Recommendations = () => {
  const { recApiResponse } = useContext(ApiContext);
  const { seeds, tracks } = recApiResponse;
  //console.log("SEEDS", seeds);
  //console.log("TRACKS", tracks);

  if (!recApiResponse) {
    return <BeatLoader color="#36D7B7" loading={true} size={30} />;
  }

  if (recApiResponse && recApiResponse.tracks && recApiResponse.seeds) {
    return (
      <div className='recommendations'>
        <h1 className='recommendations-title'>
          Specially For You</h1>

          <div className='rec-tracks-container'>
            {tracks.map((track) => (
              <div className='rec-track-card' key={track.id}>
                <h3 className='rec-trackname'>{track.name}</h3>
                <img className='rec-track-img' src={track?.album.images[ 0 ].url} alt={track.name} />
                <h4>{track?.artists[0]?.name}</h4>
              </div>
            ))}
          </div>

      </div>
    )
  }




}

export default Recommendations;