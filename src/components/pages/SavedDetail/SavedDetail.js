import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { ApiContext } from '../../../services/Api';


//detalles de las canciones favoritas
const SavedDetail = () => {
    const { trackId } = useParams();
    const [ likedTrackDetails, setLikedTrackDetails ] = useState(null);
    const { access_token } = useContext(ApiContext);

    useEffect(() => {
        const fetchLikedTrackDetails = async () => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/me/tracks/${trackId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + access_token,
                    },
                });
                const data = await response.json();

                setLikedTrackDetails(data);
                console.log('Detalles de la canción:', data);
            } catch (error) {
                console.log('Error al obtener los detalles de la canción:', error);
            }
        };

        fetchLikedTrackDetails();
    }, [ access_token, trackId ]);

    if (!likedTrackDetails) {
        return (
            <div>
                <BeatLoader color="#36D7B7" loading={true} size={30} />
            </div>
        )
    };

    return (
        <div>
            <h1>DETALLES DE TUS CANCIONES FAVORITAS</h1>
            <h2>{likedTrackDetails.name}</h2>
            <p>Artista: {likedTrackDetails.artists[ 0 ].name}</p>
            <p>Álbum: {likedTrackDetails.album.name}</p>
        </div>
    )
}

export default SavedDetail;