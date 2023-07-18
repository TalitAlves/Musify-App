import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from '../../../services/Api';

const Details = () => {
  const { apiResponse, artistAlbums } = useContext(ApiContext);

  // Obtén el ID del artista de los parámetros de la URL utilizando react-router-dom
  const { id } = useParams();

  
  // Verifica si la información del artista está disponible y obtenla del contexto
  const artistDetails = apiResponse?.artists?.items?.find((artist) => artist.id === id);
  console.log(apiResponse);
  const artistAlbum = artistAlbums?.artists?.items?.find((artist) => artist.id === id);
  console.log(artistAlbums);


  if (artistDetails) {
    return (
      <div>
        <h2>{artistDetails.name}</h2>
        {artistDetails.images && artistDetails.images.length > 0 && (
          <img src={artistDetails.images[0].url} alt={artistDetails.name} />
        )}
        {artistDetails.genres && <p>{artistDetails.genres.join(", ")}</p>}
        {/* Mostrar otros detalles del artista que desees */}
      </div>
    );
  }

  return null;
};

export default Details;
