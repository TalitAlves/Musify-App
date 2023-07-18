import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../../../services/Api";

const Details = () => {
  const { apiResponse, artistAlbums, topTracks } = useContext(ApiContext);

  const { id } = useParams();

  const artistDetails = apiResponse?.artists?.items?.find(
    (artist) => artist.id === id
  );

  if (artistDetails) {
    return (
      <div>
        <h2>{artistDetails.name}</h2>
        {artistDetails.images && artistDetails.images.length > 0 && (
          <img src={artistDetails.images[0].url} alt={artistDetails.name} />
        )}
        {artistDetails.genres && <p>{artistDetails.genres.join(", ")}</p>}

        <h3>Top Tracks:</h3>
        <ul>
          {topTracks.slice(0, 6).map((track, index) => (
            <li key={track.id}>
              <p>{`${index + 1}. ${track.name}`}</p>
              <div>
                <p> {track.album.name}</p>
                <p> {msToTime(track.duration_ms)}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3>Álbumes:</h3>
        {artistAlbums &&
          artistAlbums.map((album) => (
            <div key={album.id}>
              <img src={album.images[0].url} alt={album.name} />
              <p>{album.name}</p>
              <p>Número de canciones: {album.total_tracks}</p>
            </div>
          ))}
      </div>
    );
  }

  return null;
};

export default Details;

// Función auxiliar para convertir milisegundos a formato de tiempo (mm:ss)
function msToTime(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
