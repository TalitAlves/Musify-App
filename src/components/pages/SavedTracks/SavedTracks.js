import './SavedTracks.css';
import React, { useState, useEffect } from 'react';
import { AiOutlineHeart } from "react-icons/ai";

const SavedTracks = () => {
    const [ savedTracks, setSavedTracks ] = useState([]);

    useEffect(() => {
        const fetchSavedTracks = async () => {
            try {
                const response = await fetch('https://api.spotify.com/v1/me/tracks', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + window.localStorage.access_token,
                    },
                });
                const data = await response.json();

                setSavedTracks(data.items);
                console.log("respuesta Saved tracks", data.items);
            } catch (error) {
                console.log("petición favoritos fallida", error);
            }
        };
        fetchSavedTracks();
    }, []);

    return (
        <div>
            <h1 className='savedtracks-title'>Saved Tracks <AiOutlineHeart /></h1>

            <div className='saved-tracks-container'>
                {savedTracks.map((track) => (
                    <div className='saved-track-card' key={track.track.id}>
                        <h3 className='saved-trackname'>{track.track.name}</h3>
                        <img className='saved-track-img' src={track.track.album.images[ 0 ].url} alt={track.track.name} />
                        <h4>{track.track.artists[ 0 ].name}</h4>
                    </div>
                )
                )}
            </div>


        </div>
    );
};

export default SavedTracks;
