import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ApiContext } from "../../../services/Api";
import "./ArtistDetails.css";

const Details = () => {
  const { apiResponse, artistAlbums, topTracks } = useContext(ApiContext);
  console.log(apiResponse);

  const { id } = useParams();

  const artistDetails = apiResponse?.artists?.items?.find(
    (artist) => artist.id === id
  );

  if (artistDetails) {
    return (
      <div className="center">
        <div className="artist-primary-container">
          <div className="img-container-artist">
            {artistDetails.images && artistDetails.images.length > 0 && (
              <img src={artistDetails.images[0].url} alt={artistDetails.name} />
            )}
          </div>
          <div className="artist-container">
            <h2 className="name-artist">{artistDetails.name}</h2>
            {artistDetails.genres && (
              <p className="genres-container">{artistDetails.genres[0]}</p>
            )}

            <ul className="tracks-artist-container">
              {topTracks.slice(0, 6).map((track, index) => (
                <li className="li-container-tracks" key={track.id}>
                  <div className="id-tracks">
                    <p>{`0${index + 1} `}</p>
                  </div>
                  <div className="tracks-data">
                    <p className="name-class">{` ${track.name}`}</p>
                    <div className="album-times-container">
                      <p className="name-tracks"> {track.album.name}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="albums-title">Álbumes</h3>
        <div className="container-albums-artist-data">
          {artistAlbums &&
            artistAlbums.map((album) => (
              <div className="albums-artists-conainer" key={album.id}>
                <img
                  className="img-album-artist"
                  src={album.images[0].url}
                  alt={album.name}
                />
                <div className="data-album-container">
                  <p className="album-name">{album.name}</p>
                  <p className="album-tracks-number"> {album.total_tracks} Songs</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return null;
};

export default Details;

function msToTime(duration) {
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
