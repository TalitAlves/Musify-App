import React from 'react'
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ApiContext } from '../../../services/Api';

const SongDetails = () => {
    const { trackId } = useParams();
    const { recApiResponse } = useContext(ApiContext);

    const songDetails = recApiResponse?.tracks?.find(track => track.id === trackId);
    console.log(songDetails);

if (songDetails) {
    return (
        <div className='song-details-page'>
            <h1>{songDetails.name}</h1>
            {songDetails.album.images && songDetails.album.images.length > 0 && (
                <img src={songDetails.album.images[0].url} alt={songDetails.name}/>
            )} 
        </div>
    )
}

}
export default SongDetails;