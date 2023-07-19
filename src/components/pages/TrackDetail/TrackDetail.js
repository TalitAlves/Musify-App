import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './TrackDetails.css';

const TrackDetail = () => {
    //con useParams me traigo los datos del Id del track
    const { trackId } = useParams();
    const [ trackDetails, setTrackDetails ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + window.localStorage.access_token,
                    },
                });
                const data = await response.json();

                setTrackDetails(data);
                console.log("respuesta fetch trackId", data);
            } catch (error) {
                console.log("Error al obtener los detalles del track:", error);
            }
        }

        fetchData();
    }, [ trackId ]);

    if (!trackDetails) {
        return (
            <div>
                <p>cargando detalles</p>
            </div>
        )
    }

    return (
        <div className='track-details-container'>
            <h1 className='track-details-title'>DETALLES DEL TRACK</h1>
            <h1 className='track-details-track'>{trackDetails.name}</h1>
            <img 
            src={trackDetails.album.images[ 0 ].url} 
            alt={trackDetails.album.name}
            className='track-details-img'
             />
            <h3>Nombre de la canción: {trackDetails.artists[ 0 ].name}</h3>
            <p>Popularidad de la canción según nuestros usuarios: {trackDetails.popularity}</p>
            <p>Tipo: {trackDetails.album.album_type} {trackDetails.type}</p>
            <p>Nombre del álbum: {trackDetails.album.name}</p>
            <p>Tipo: {trackDetails.artists[ 0 ].type}</p>
            <p>duración en milisegundos: {trackDetails.duration_ms} ms</p>
            <p>Mercados en los que está disponible actualmente: {trackDetails.album.available_markets.join(", ")}</p>
        </div>
    )
}

export default TrackDetail;