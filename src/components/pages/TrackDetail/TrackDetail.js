import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const TrackDetail = () => {
    //con useParams me traigo los datos del Id del track
    const { trackId } = useParams();
    const [ trackDetails, setTrackDetails ] = useState(null);
    console.log(trackDetails);

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
                console.log("respuesta api en trackDetails",data);
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
        <div>
            <h1>ESTOS SON LOS DETALLES DEL TRACK</h1>
            <h3>{trackDetails.artists[0].name}</h3>
            <p>Tipo de álbum: {trackDetails.album.album_type}</p>
            <p>Nombre del álbum: {trackDetails.album.name}</p>
            <p>Tipo: {trackDetails.artists[0].type}</p>
            <p>Mercados en los que está disponible: {trackDetails.album.available_markets}</p>
        </div>
    )
}

export default TrackDetail;